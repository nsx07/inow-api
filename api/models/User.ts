export interface IUser {
    name : string,
    email : string,
    cpf : string
}

export class User implements IUser {
    name! : string;
    email!: string;
    cpf! : string
}

export abstract class crudUser {
    abstract getUsers() : IUser[] | Promise<IUser[]> | IUser
    abstract createUser() : string | Promise<any>
    abstract updateUser(id : number, fields : string[], values : string[]) : string | Promise<any>
    abstract deleteUser(id : number | string) : string | Promise<any>
}