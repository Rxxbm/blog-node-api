import { Response, Request } from "express";
import { ReturnError } from "../exceptions/dto/return-error.dto";
import { UserInsertDTO } from "../models/dtos/user-insert.dto";
import { createUser, getUsers } from "../services/user-services";

export class UserController {
    public static async getAllUsers(__, res:Response):Promise<Response>{
        try{
            const users = await getUsers();
            return res.status(200).json(users);
        }catch(error){
            new ReturnError(res, error);
        }
    }
    public static async createOneUser(req: Request<undefined, undefined, UserInsertDTO>, res:Response):Promise<Response>{
        try{
            const user = await createUser(req.body);
            return res.status(200).json(user);
        }catch(error){
            new ReturnError(res, error);
        }
    }
}