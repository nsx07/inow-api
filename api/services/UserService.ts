import { crudUser, IUser } from "../models/User.ts";
import { client } from "../util/databaseService.ts";

export class UserService extends crudUser {

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
        const query = "SELECT * FROM USER";
        console.log(query)

        await client.execute(query).then((_users : any) => this.users = _users.rows);
        return this
    }

    async createUser(): Promise<any> {
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
