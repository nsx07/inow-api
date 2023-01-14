import { Model } from 'https://deno.land/x/denodb@v1.2.0/mod.ts';
import { SecurityStorage } from './../util/SecurityPass.ts';
import { ILog, IUserDTO, UserTool } from './../models/User.ts';
import { IUser } from "../models/User.ts";
import { dataBase } from "./DatabaseService.ts";
import { User } from "../models/Entities.ts";

export class UserService {

    status! : number;
    log : ILog = {}

    constructor() {
        return this
    }

    async getUserById(id : number) : Promise<IUserDTO> {
        
        return await User.select().where("id", id).get()
            .then((result : any) => {
                this.status = 200
                const pipe : IUserDTO = new IUserDTO(result[0])
                return pipe
            })
            .catch((err) => {
                this.status = 300
                return err
            })
            .finally(() => dataBase.close())

    }

    async getUsers() : Promise<Array<IUserDTO>> {      
        return await User.all()
            .then((result : any) => {
                this.status = 200
                const pipe = new Array<IUserDTO>();
                for (let user of result) pipe.push(new IUserDTO(user)) 
                return pipe
            })
            .catch((err) => {
                this.status = 300
                return err
            })
            .finally(() => dataBase.close())
    }

    async createUser(user : any): Promise<Boolean> {
        const security = new UserTool(user)
        user.password = security.security
        user.secretKey = security.keySecurity

        return await User.create([user])
            .then(result => {
                this.status = 200
                return true
            })
            .catch(reason => {
                console.warn(reason)
                this.status = 400
                return false
            })
            .finally(() => dataBase.close())

    
    }

    async logUser(log : ILog) : Promise<ILog> {

        const security = new SecurityStorage();
        await User.select("password","secretKey","id").where("email", log?.email??"").get()
            .then((result : any) => {
                if (result.length) {
                    this.log.id = result[0].id
                    this.log.email = log.email
                    if (log.password === security.decrypt(result[0].password, result[0].secretKey)) this.log.password = true
                    else this.log.password = false
                } else {
                    this.log.email = false
                    this.log.password = false
                }
            })
            .catch((err) => {
                console.warn(err)
                return err
            })
            .finally(() => dataBase.close())
            return this.log
    }

    async updateUser(user : any): Promise<IUser> {
        return await User.where("id", user.id).update(user)
            .then((result) => {
                this.status = 200;
                return result;
            })
            .catch((err) => {
                console.warn(err)
                this.status = 400;
                return err;
            })
            .finally(() => dataBase.close())
    }

    async deleteUser(id : number | string): Promise<Boolean> {
        return await User.deleteById(id)
            .then((result : any) => {
                console.log(result)
                return result.affectedRows ? true : false
            })
            .catch((err) => {
                console.warn(err)
                return false
            })
            .finally(() => dataBase.close())
    } 
}
