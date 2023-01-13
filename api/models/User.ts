import { SecurityStorage } from "../util/Security.ts"

export interface IUser {
    id : number,
    name : string ,
    lastname : string 
    email : string ,
    password : string ,
    cpf : string ,
    phone : string 
    secretKey : number 
}

export interface ILog {
    email? : string | boolean,
    password? : string | boolean
}

export class UserTool {
    
    protected user! : IUser;
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
