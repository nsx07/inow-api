import { client } from "../util/databaseService.ts";

export interface IUser {
    name : string,
    email : string,
    cpf : string
}

export abstract class crudUser {
    abstract getUsers() : IUser[] | Promise<IUser[]> | User
    abstract setUsers() : string | Promise<any>
    abstract updateUser(id : number, fields : string[], values : string[]) : string | Promise<any>
    abstract deleteUser(id : number | string) : string | Promise<any>
}

export class User extends crudUser {

    status! : string;
    users! : IUser[]
    user! : IUser ;

    constructor(user? : IUser) {
        super();
        if (user) this.user = {
                    name : user.name,
                    cpf : user.cpf,
                    email : user.email
                }
        
        return this
    }

    get users_() {
        return this.users;
    }

    async getUsers() : Promise<any> {        
        await client.execute("SELECT * FROM USER").then((_users : any) => this.users = _users.rows);
        return this
    }

    async setUsers(): Promise<any> {
        if (this.user) {
            let query = `INSERT INTO user (NAME, CPF, EMAIL) VALUES ('${this.user.name}', '${this.user.cpf}', '${this.user.email}')`;
            console.debug(query);

            try {
                await client.execute(query)
                .then(result => {
                    this.status = "200"
                    return result
                })
            } catch (error) {
                console.error(`DATABASE ERROR :${error}`);
            }
        } else return "User not valid";
    }

    async updateUser(id : number ,fields : string[], values : string[]): Promise<any> {
        if (fields.length != values.length) return;
        let fields_ = "";
        for (let index = 0; index < fields.length; index++) {
            fields_ += `${fields[index]}='${values[index]}',`
        }
        fields_ = fields_.substring(0, fields_.length-1);

        let query = `UPDATE USER SET ${fields_} WHERE USER.ID = ${id}`;
        console.log(query);

        try {
            await client.execute(query)
                .then(result => {
                    this.status = "200"
                    return result
                });
        } catch (error) {
            console.error(`DATABASE ERROR :${error}`);
        }
    }

    async deleteUser(id : number | string): Promise<any> {
        let query = `DELETE FROM USER WHERE USER.ID = ${id}`
        console.log(query);

        try {
            await client.execute(query)
                .then(result => {
                    this.status = "200";
                    return result
                });
        } catch (error) {
            console.error(`DATABASE ERROR :${error}`);
        } 
    }    

}
