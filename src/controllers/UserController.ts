import { Response, Request } from "express";
import { BadRequestException } from "../exceptions/bad-request-exception";
import { ReturnError } from "../exceptions/dto/return-error.dto";
import { UserAuth } from "../models/dtos/user-auth.dto";
import { UserEditPasswordDTO } from "../models/dtos/user-edit.dto";
import { UserInsertDTO } from "../models/dtos/user-insert.dto";
import { createUser, deleteUserById, editUserPasswordById, getUsers } from "../services/user-services";
import { getUserByToken } from "../utils/auth";

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
    public static async deleteOneUser(req: Request, res: Response):Promise<Response>{
        const isInteger = (value: string) => {
            return /^\d+$/.test(value);
        };
        const validate = isInteger(req.params.id);

        if (!validate) {
            new ReturnError(res, new BadRequestException('id must be a integer'));    
        }else{
            try{
                const id = parseInt(req.params.id);
                const user = await deleteUserById(id);
                return res.status(200).json(user);
            }catch(error){
                new ReturnError(res, error);
            }
        }
    }
    public static async editUserPassword(req: Request<undefined, undefined, UserEditPasswordDTO>, res: Response):Promise<Response> {
        try{
            const userID = await getUserByToken(req).then((user: UserAuth) => user.userId);
            const user = await editUserPasswordById(userID, req.body);
            return res.status(200).json(user);
        }catch(error){
            new ReturnError(res, error);
        }
    }
}