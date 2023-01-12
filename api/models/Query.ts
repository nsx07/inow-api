export interface Parameters {
    colum : string,
    value : string
  }
  
  export interface QueryParameters {
    table : string,
    query : Array<Parameters>
    fields? : Array<string>
  }
  
  export interface IQueryEntity {
    action : string,
    httpParameters? : any,
    queryParameters : QueryParameters,
    body? : any
  }
