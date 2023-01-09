import { enviroment } from './../config/config.ts';
import { Client } from "https://deno.land/x/mysql@v2.11.0/mod.ts";

const client = new Client()
  await client
    .connect({
      poolSize : enviroment.defaultPoolSize,
      username : enviroment.defaultUserdb,
      idleTimeout : enviroment.timeout,
      hostname : enviroment.hostDb,
      db : enviroment.defaultDb,
      port : enviroment.portDb,
    });

export { client }