import { SecurityStorage } from './../util/security.ts';
import { ILog, User } from './../models/User.ts';
import { crudUser, IUser } from "../models/User.ts";
import { client } from "../util/databaseService.ts";

export class UserService extends crudUser {

    status! : string;
    isUser! : boolean;
    users! : IUser[]
    user! : IUser ;

    constructor(user? : IUser) {
        super();
        if (user) this.user = user
        // const checkConnection = setInterval(async _ => {
        //     if (this.status !== undefined) {
        //         await client.close();
        //         clearInterval(checkConnection);
        //     }
        // },150);
        
        return this
    }

    async getUsers() : Promise<any> {        
        const query = "SELECT * FROM USER";
        console.log(query)

        await client.execute(query)
            .then((_users : any) => this.users = _users.rows);
        return this
    }

    async createUser(): Promise<any> {
        if (this.user) {
            let query = `INSERT INTO user (NAME, LASTNAME, CPF, EMAIL, PHONE) VALUES ('${this.user.name}', '${this.user.lastname}', '${this.user.cpf}', '${this.user.email}', ${this.user.phone})`;
            const user = new User(this.user)
                        
            console.debug(query);

            try {
                await client.execute(query)
                .then(async result => {
                    const queryToPass = `INSERT INTO SECURITY (U_ID, SECRET, SECRET_KEY) VALUES ('${result.lastInsertId}', '${user.security}', '${user.keySecurity}')`
                    await client.execute(queryToPass).then( result => {
                        this.status = "200"
                    })
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

    async logUser(log : ILog) : Promise<any> {
        const security = new SecurityStorage();   
        const query = `
            SELECT U.EMAIL, S.SECRET, S.SECRET_KEY FROM USER AS U, SECURITY AS S 
             WHERE U.EMAIL = '${log.email}' and s.u_id = u.id`
            console.warn(query)
        await client.execute(query).then(
            result => {
                if (result.rows) {
                    const rows = result.rows
                    const checkPass = rows.find(user => security.decrypt(user.SECRET, user.SECRET_KEY) == log.password);
                    this.isUser = checkPass ? true : false
                } else this.isUser = false
                this.status = this.isUser ? "200" : "210";
            }
        )
    }

}
