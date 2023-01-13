import { ILog, IUser, UserTool } from './../models/User.ts';
import { RouterContext, RouterMiddleware } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { UserService } from "../services/UserService.ts";

const userService = new UserService();

const getUsers = async (context : RouterContext<"/api/v1/getUsers">) => {
    let users = await userService.getUsers();
    context.response.body = users;
    context.response.status = userService.status;
}

const createUser = async (context : RouterContext<"/api/v1/createUser">) => {    
    let userToInsert  : IUser = await context.request.body().value;
    let service = await userService.createUser(userToInsert);
    context.response.body = service;
    context.response.status = userService.status;
}

const logUser = async (context : RouterContext<"/api/v1/security/log">) => {
    let logInfo : ILog = await context.request.body().value;
    await userService.logUser(logInfo);
    context.response.body = userService.log;
    context.response.status = userService.status;
}

const updateUser = async (context : RouterContext<"/api/v1/updateUser">) => {
    const userToUpdate : IUser = await context.request.body().value;
    const service = await userService.updateUser(userToUpdate);
    context.response.body = service;
    context.response.status = userService.status;
}

const deleteUser = async (context : RouterContext<"/api/v1/deleteUser">) => {
    let idUser = await context.request.body().value;

    const service = userService.deleteUser(idUser.id);

    context.response.body = service;
    context.response.status = userService.status;

}


export { getUsers, createUser, updateUser, deleteUser, logUser }