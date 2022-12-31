import { ConvertFileToString } from './../util/ConvertFileToString.ts';
import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts"
import {
    createUser,
    getUsers,
    updateUser,
    deleteUser
 } from "../controllers/UserController.ts"

const router = new Router();
const pagesPath = "./pages/"
let pageContent = "";

async function getPage(pageName : string) {
    const extractor = new ConvertFileToString(`${pagesPath}${pageName}.html`)
        await extractor.getFile().then(_content => pageContent = _content)
            return extractor.content || pageContent;
}

router
    .get("/welcome", async context => {
        context.response.status = 200;
        context.response.body = await getPage("welcome");
    })
    .get("/api/v1/getUsers", getUsers)
    .post("/api/v1/createUser", createUser)
    .put("/api/v1/updateUser", updateUser)
    .delete("/api/v1/deleteUser", deleteUser);

export default router;