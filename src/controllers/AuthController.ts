import { Request, Response } from "express";
import { ReturnError } from "../exceptions/dto/return-error.dto";
import { AuthDTO } from "../models/dtos/auth.dto";
import { validateAuth } from "../services/auth.services";

export class AuthController {
    public static async authenticateUser (req:Request<undefined, undefined, AuthDTO>, res:Response):Promise<Response> {
        try{
            const user = await validateAuth(req.body);
            return res.status(200).json(user);
        }catch (error) {
            new ReturnError(res, error);
        }
    }
}