import { QueryMapper } from './../util/QueryMapper.ts';
import { IQueryEntity } from "../models/Query.ts";

export class GenericService {
    
    status! : number
    body! : any

    constructor() {
        return this
    }

    async getInfo (requestQuery : IQueryEntity) {
        // console.debug(requestQuery)
        
        // const query = new QueryMapper(requestQuery)
        //     // query.assembleQuery();
        // console.debug(
        //     query.assembleQuery()
        //     )

        // await client.execute(query.assembleQuery()).then(result => this.body = result.rows); 
    }
}