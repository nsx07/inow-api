import { ConvertFileToString } from './../util/ConvertFileToString.ts';
import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts"
import { oakCors  } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
logUser,
 } from "../controllers/UserController.ts"
import { getInfo } from "../controllers/GenericController.ts";

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

    .options("/api/v1/internal/getInfo", oakCors(), getInfo)
    .get("/api/v1/internal/getInfo", oakCors(), getInfo)
    .post("/api/v1/internal/getInfo", oakCors(), getInfo)

    .options("/api/v1/createUser", oakCors(), createUser)
    .post("/api/v1/createUser", oakCors(), createUser)

    .options("/api/v1/security/log", oakCors(), logUser)
    .post("/api/v1/security/log", oakCors(), logUser)
    
    .options("/api/v1/updateUser", oakCors(), updateUser)
    .put("/api/v1/updateUser", oakCors(), updateUser)
    
    .options("/api/v1/deleteUser", oakCors(), deleteUser)
    .delete("/api/v1/deleteUser", oakCors(), deleteUser);

export default router;