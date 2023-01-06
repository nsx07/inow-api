import { SecurityStorage } from "../util/security.ts"

export interface IUser {
    name : string,
    lastname : string
    email : string,
    password : string,
    cpf : string,
    phone : string

}

export interface ILog {
    email : string,
    password : string
}

export class User {
    
    user! : IUser;
    security! : string;
    keySecurity! : number;

    /**
     *
     */
    constructor(user : IUser) {
        const security = new SecurityStorage();

        this.user = user;
        this.security = security.encrypt(user.password);
        this.keySecurity = security.key;
    }
}

export abstract class crudUser {
    abstract getUsers() : IUser[] | Promise<IUser[]> | IUser
    abstract createUser() : string | Promise<any>
    abstract updateUser(id : number, fields : string[], values : string[]) : string | Promise<any>
    abstract deleteUser(id : number | string) : string | Promise<any>
}