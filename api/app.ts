import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/oakCors.ts";
import router from "./routes/routes.ts";
import { initDb } from "./services/DatabaseService.ts";

const HOST : string = config().HOST ?? "127.0.0.1";
const PORT : string | number = config().PORT ?? 6969;

initDb()
const app = new Application();
app.use(oakCors())
app.use(router.allowedMethods());
app.use(router.routes());


console.info(`Deno is running => ${HOST}:${PORT}`);
await app.listen(`${HOST}:${PORT}`)
