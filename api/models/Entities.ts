import { DataTypes } from 'https://deno.land/x/denodb@v1.2.0/mod.ts';
import { Model } from 'https://deno.land/x/denodb@v1.2.0/mod.ts';

export class User extends Model {
    static table = "user";
    static timestamps = true;

    static fields = {
        id : {type : DataTypes.INTEGER, primaryKey : true, autoIncrement: true},
        phone : {type : DataTypes.STRING, length : 15, unique : true},
        cpf : {type : DataTypes.STRING, length : 11, unique : true},
        email : {type : DataTypes.STRING, unique : true},
        secretKey : {type : DataTypes.INTEGER},
        lastName : {type : DataTypes.STRING},
        password : {type : DataTypes.STRING},
        name : {type : DataTypes.STRING}
    };
}