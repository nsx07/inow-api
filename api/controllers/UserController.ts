import { ILog, IUser } from './../models/User.ts';
import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { UserService } from "../services/UserService.ts";
import { LOG } from '../util/Decorators.ts';

const userService = new UserService();

const getUserById = async (context : RouterContext<"/api/v1/getUserById:id">) => {
    LOG("GET USER BY ID")

    const userId = context.params ? +context.params.id : 0
    let user = await userService.getUserById(userId);

    context.response.body = user;
    context.response.status = userService.status??200;
}

const getUsers = async (context : RouterContext<"/api/v1/getUsers">) => {
    LOG("GET USERS")

    let users = await userService.getUsers();

    context.response.body = users;
    context.response.status = userService.status;
}

const createUser = async (context : RouterContext<"/api/v1/createUser">) => {    
    LOG("CREATE USER")

    let userToInsert  : IUser = await context.request.body().value;
    let service = await userService.createUser(userToInsert);

    context.response.body = service;
    context.response.status = userService.status;
}

const logUser = async (context : RouterContext<"/api/v1/security/log">) => {
    LOG("LOG")

    let logInfo : ILog = await context.request.body().value;
    await userService.logUser(logInfo);
    context.response.body = userService;
    context.response.status = userService.status;
}

const updateUser = async (context : RouterContext<"/api/v1/updateUser">) => {
    LOG("UPDATE USER")
    
    const userToUpdate : IUser = await context.request.body().value;
    const service = await userService.updateUser(userToUpdate);
    context.response.body = service;
    context.response.status = userService.status;
}

const deleteUser = async (context : RouterContext<"/api/v1/deleteUser">) => {
    LOG("DELETE USER")
    
    let idUser = await context.request.body().value;
    const service = await userService.deleteUser(idUser.id);
    context.response.body = service;
    context.response.status = userService.status;
}


export { getUsers, createUser, updateUser, deleteUser, logUser, getUserById }