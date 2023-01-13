import { SecurityStorage } from './../util/Security.ts';
import { ILog, UserTool } from './../models/User.ts';
import { IUser } from "../models/User.ts";
import { dataBase } from "./DatabaseService.ts";
import { User } from "../models/Entities.ts";
import { Values } from 'https://deno.land/x/denodb@v1.2.0/lib/data-types.ts';

export class UserService {

    status! : number;
    users! : IUser[]
    user! : IUser;
    log : ILog = {}

    constructor() {
        return this
    }

    async getUsers() : Promise<any> {      
        return await User.all()
            .then((result) => {
                this.status = 200
                return result
            })
            .catch((err) => {
                this.status = 300
                return err
            });
    }

    async createUser(user : any): Promise<any> {
        const security = new UserTool(user)
        user.password = security.security
        user.secretKey = security.keySecurity

        return await User.create([user])
            .then(result => {
                this.status = 200
                return true
            })
            .catch(reason => {
                this.status = 400
                return false
            })
    
    }

    async logUser(log : ILog) : Promise<any> {

        await User.select("password","secretKey").where("email", log?.email??"").get()
            .then((result : any) => {
                if (result.length) {
                    this.log.email = log.email
                    this.log.password = false
                    if (log.password === new SecurityStorage().decrypt(result[0].password, result[0].secretKey)) this.log.password = true
                    
                    return
                } else this.log.email = false
            }).catch((err) => {
                console.log(err)
            });
            


    }

    async updateUser(user : any): Promise<any> {
        return await User.where("id", user.id).update(user)
            .then((result) => {
                this.status = 200;
                return result;
            }).catch((err) => {
                this.status = 400;
                return err;
            });
    }

    async deleteUser(id : number | string): Promise<any> {
        return await User.deleteById(id)
            .then((result) => {
                return true
            }).catch((err) => {
                console.warn(err)
                return false
            });
    } 
}
