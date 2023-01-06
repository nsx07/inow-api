import { Client, ExecuteResult } from "https://deno.land/x/mysql@v2.11.0/mod.ts";

const client = await new Client().connect({
  hostname: "127.0.0.1",
  username: "root",
  poolSize : 5,
  db: "inow",
});

export { client }