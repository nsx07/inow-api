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

const utilDataBaseAction = {
  initDb : async () => {
    await client.execute(
      `
      CREATE TABLE USER (
        ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        NAME VARCHAR(30) NOT NULL,
        LASTNAME VARCHAR(75) NOT NULL,
        CPF CHAR(11) NOT NULL UNIQUE,
        EMAIL VARCHAR(35) NOT NULL,
        PHONE VARCHAR(15) NOT NULL
      );
      CREATE TABLE SECURITY (
        ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        U_ID INT NOT NULL,
        SECRET VARCHAR(18) NOT NULL,
        SECRET_KEY INT NOT NULL,

        FOREIGN KEY (U_ID) REFERENCES USER(ID)
     )`
      )
  }
}

export { client }