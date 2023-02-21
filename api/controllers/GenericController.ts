import { IQueryEntity } from './../models/Query.ts';
import { GenericService } from './../services/GenericService.ts';
import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { LOG } from '../util/Decorators.ts';


const getInfo = async (context : RouterContext<"/api/v1/internal/getInfo">) => {
    const hasQuery : IQueryEntity =  await context.request.body().value 

    LOG("getInfo")

    const genService = new GenericService()
        await genService.getInfo(hasQuery)

    context.response.status = 200
    context.response.body = genService.body
}

export { getInfo }