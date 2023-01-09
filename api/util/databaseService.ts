import { enviroment } from './../config/config.ts';
import { Client } from "https://deno.land/x/mysql@v2.11.0/mod.ts";

<<<<<<< HEAD
const client = new Client()
  await client
    .connect({
      poolSize : enviroment.defaultPoolSize,
      username : enviroment.defaultUserdb,
      idleTimeout : enviroment.timeout,
      hostname : enviroment.hostDb,
      db : enviroment.defaultDb,
      port : enviroment.portDb,
=======

const client = new Client()
  await client
    .connect({
  
      hostname: "127.0.0.1",
      port: 3306,
      username: "root",
      poolSize : 5,
      db: "inow",
>>>>>>> 06613f66b2483dc7ee1dc6b3db1a9d72a90587ed
    });

const utilDataBaseAction = {
  initDb : async () => {
    await client.execute(
      `
      CREATE TABLE IF NOT EXISTS USER (
        ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        NAME VARCHAR(30) NOT NULL,
        LASTNAME VARCHAR(75) NOT NULL,
        CPF CHAR(11) NOT NULL UNIQUE,
        EMAIL VARCHAR(35) NOT NULL,
        PHONE VARCHAR(15) NOT NULL
      );
      CREATE TABLE IF NOT EXISTS SECURITY (
        ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        U_ID INT NOT NULL,
        SECRET VARCHAR(18) NOT NULL,
        SECRET_KEY INT NOT NULL,

        FOREIGN KEY (U_ID) REFERENCES USER(ID)
      )
     `).then(response => console.log(response))
        .catch(error  => console.error(error))
  }
}

// utilDataBaseAction.initDb().then(resp => console.info(resp))

export { client, utilDataBaseAction }