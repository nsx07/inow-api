import { Client, ExecuteResult } from "https://deno.land/x/mysql@v2.11.0/mod.ts";


const client = await new Client()
  client
    .connect({
  
      hostname: "144.22.234.67",
      port: 22,
      username: "inow-admin",
      password : "inow@Adm_2023",
      poolSize : 5,
      db: "inow",
    });

export { client }