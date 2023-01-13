import { enviroment } from './../config/config.ts';
import { Database, MySQLConnector } from "https://deno.land/x/denodb@v1.2.0/mod.ts";
import { User } from '../models/Entities.ts';

const connector = new MySQLConnector({
  username : enviroment.defaultUserdb??"root",
  database : enviroment.defaultDb??"inow",
  host : enviroment.hostDb??"127.0.0.1",
  port : enviroment.portDb??"3306",
  password : enviroment.password 
});

const dataBase = new Database(connector)

const initDb = () => {
  dataBase.link([User])
  // dataBase.sync()
}
  
export { dataBase, initDb }