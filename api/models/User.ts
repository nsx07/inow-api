import { Model } from "https://deno.land/x/denodb@v1.2.0/mod.ts";
import { SecurityStorage } from "../util/SecurityPass.ts"

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

export class IUser implements IUser {
    id! : number;
    name! : string ;
    lastname! : string 
    email! : string ;
    password! : string ;
    cpf! : string ;
    phone! : string 
    secretKey! : number 
}

export interface IUserDTO {
    id : number,
    name : string,
    lastName : string,
    email : string,
    cpf : string,
    phone : string
}

export class IUserDTO extends Model implements IUserDTO{

    constructor(user : any) {
        super()
        
        this.id = user.id;
        this.name = user.name ;
        this.lastName = user.lastName 
        this.email = user.email ;
        this.cpf = user.cpf ;
        this.phone = user.phone 

        return this
    }

    id! : number;
    name! : string ;
    lastName! : string 
    email! : string ;
    cpf! : string ;
    phone! : string 
}

export interface ILog {
    id? : number | string,
    input? : string | boolean,
    inputType : LogOptions
    password? : string | boolean
}

export enum LogOptions {
    "CPF" = 1,
    "EMAIL" = 2,
    "PHONE" = 3
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
