import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import router from "./routes/routes.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/oakCors.ts";

const HOST : string = config().HOST ?? "127.0.0.1";
const PORT : string | number = config().PORT ?? 6969;
const cors = oakCors({
    allowedHeaders : 'Access-Control-Allow-Origin, http://localhost:4200/*',
    "origin": "http://localhost:4200/*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": true,
    "optionsSuccessStatus": 204,
   })
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
app.use(cors)

console.log(`Deno is running => ${HOST}:${PORT}`);
await app.listen(`${HOST}:${PORT}`)
