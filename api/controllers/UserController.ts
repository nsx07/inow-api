import { RouterContext, RouterMiddleware } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { UserService } from "../services/UserService.ts";

const getUsers = async (context : RouterContext<"/api/v1/getUsers">) => {
    const users = await new UserService().getUsers();
    if (users) context.response.status = 200;
    else context.response.status = 404;
    context.response.body = users;
}
const createUser = async (context : RouterContext<"/api/v1/createUser">) => {
    let body = await context.request.body().value;
    console.log(body);

    let email = context.request.url.searchParams.get("email") || ""
    let name = context.request.url.searchParams.get("name") || "";
    let cpf = context.request.url.searchParams.get("cpf") || "";

    const user = new UserService({name, email, cpf});
        await user.createUser();

    context.response.status = +user.status;
    context.response.body = user;
}

const updateUser = async (context : RouterContext<"/api/v1/updateUser">) => {
    let body = await context.request.body().value;
    console.log(body);

    let email = context.request.url.searchParams.get("email") || ""
    let name = context.request.url.searchParams.get("name") || "";
    let cpf = context.request.url.searchParams.get("cpf") || "";
    let id = context.request.url.searchParams.get("id") || ""

    let fields = ["name", "cpf","email"], values = [name, cpf, email]

    const user = new UserService();
        await user.updateUser(+id,fields, values);

    context.response.status = +user.status;
    context.response.body = user.status === "200" ? true : false;
}

const deleteUser = async (context : RouterContext<"/api/v1/deleteUser">) => {
    let id = context.request.url.searchParams.get("id");

    if (id) {
        const user = new UserService()
            await user.deleteUser(id);

            
        context.response.status = +user.status;
        context.response.body = user.status === "200" ? true : false;

    } else {
        context.response.body = "Id parameter is missing.";
        context.response.status = 210;
    }

}

export { getUsers, createUser, updateUser, deleteUser}