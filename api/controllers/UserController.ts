import { ILog, IUser, User } from './../models/User.ts';
import { RouterContext, RouterMiddleware } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { UserService } from "../services/UserService.ts";

const getUsers = async (context : RouterContext<"/api/v1/getUsers">) => {
    // context.response.headers.set('Access-Control-Allow-Origin', '*')
    // let params = context.request.url.toJSON()

    // if (params) params.split("?")[1].split("&")

    const users = new UserService();
        await users.getUsers();
    if (users) context.response.status = 200;
    else context.response.status = 404;
    context.response.body = users;
}

const createUser = async (context : RouterContext<"/api/v1/createUser">) => {
    let body = await context.request.body().value;

    

    let newUser : IUser = body
    
    const user = new UserService(newUser);
    const result = await user.createUser();
    
    context.response.status = +user.status;
    context.response.body = result;
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

const logUser = async (context : RouterContext<"/api/v1/security/log">) => {
    let body = await context.request.body().value;
    const log : ILog = body

    const user = new UserService();
        await user.logUser(log)

        context.response.status = +user.status
        context.response.body = {
            email : user.log.email,
            password : user.log.password
        }

}

export { getUsers, createUser, updateUser, deleteUser, logUser }