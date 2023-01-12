import { IQueryEntity, Parameters, QueryParameters } from './../models/Query.ts';
export class QueryMapper {
    
    parameters : Parameters[] | undefined = []
    query : QueryParameters 
    fields! : string[] | undefined
    queryAssembled! : string
    
    constructor(query : any) {
        // this.fields = this.query?.queryParameters?.fields
        // this.parameters = this.query?.queryParameters?.query
        this.query = query
        
        // console.log(query, this.assembleQuery()
        return this
    }

    get getFields() {
        let fieldsToAssemble : string = "";
        
        this.query?.fields?.forEach((field, index,arr) => {
            fieldsToAssemble += `${field}`
            if (arr.length-1 !== index ) fieldsToAssemble += ","
        })
        return fieldsToAssemble
    }
    get getTable() {
        return this.query?.table
    }

    get getParameters() {
        let parametersToAssemble : string = "";
        this.query?.query?.forEach((param,index,arr) => {
            parametersToAssemble += `${param.colum} = '${param.value}'`
            if (arr.length-1 !== index ) parametersToAssemble += ","
        })
        return parametersToAssemble;
    }

    assembleQuery() : string {
        // console.log(this.query)
        this.queryAssembled = 
            `
                SELECT ${this.getFields} FROM ${this.getTable}
                    WHERE ${this.getParameters}
            `
        return this.queryAssembled;
    }
}