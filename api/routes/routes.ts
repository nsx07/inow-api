import { User } from './../models/User.ts';
import { ConvertFileToString } from './../util/ConvertFileToString.ts';
import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts"

const router = new Router();
const pagesPath = "./pages/"
let pageContent = "";

function getPage(pageName : string) : string | null {
    const extractor = new ConvertFileToString(`${pagesPath}${pageName}.html`)
        extractor.getFile().then(_content => pageContent = _content)
            return extractor.content || pageContent;
}

router
    .get("/api/v1/welcome", (context) => {
        context.response.status = 200;
        context.response.body = getPage("welcome");
        console.log(context.request.url.searchParams.get("params"));
    })
    .get("/api/v1/getUsers", async context => {
        const users = await new User().getUsers();
        if (users) context.response.status = 200;
        else context.response.status = 404;
        context.response.body = users;
    })
    .post("/api/v1/createUser", async context => {
        console.debug(context.request.body())

        let email = context.request.url.searchParams.get("email") || ""
        let name = context.request.url.searchParams.get("name") || "";
        let cpf = context.request.url.searchParams.get("cpf") || "";

        const user = new User({name, email, cpf});
            await user.setUsers();

        console.log(user);
        

        context.response.status = +user.status;
        context.response.body = user;
    })
    .put("/api/v1/updateUser", async context => {
        let email = context.request.url.searchParams.get("email") || ""
        let name = context.request.url.searchParams.get("name") || "";
        let cpf = context.request.url.searchParams.get("cpf") || "";
        let id = context.request.url.searchParams.get("id") || ""

        let fields = ["name", "cpf","email"], values = [name, cpf, email]

        const user = new User();
            await user.updateUser(+id,fields, values);

        context.response.status = +user.status;
        context.response.body = user.status === "200" ? true : false;
    })
    .delete("/api/v1/deleteUser", async context => {
        let id = context.request.url.searchParams.get("id");

        if (id) {
            const user = new User()
                await user.deleteUser(id);

                
            context.response.status = +user.status;
            context.response.body = user.status === "200" ? true : false;

        } else {
            context.response.body = "Id parameter is missing.";
            context.response.status = 210;
        }

    });

export default router;