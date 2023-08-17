import { NextFunction, Request, Response } from "express";
import { UserTypeEnum } from "../enums/user-type.enum";
import { ReturnError } from "../exceptions/dto/return-error.dto";
import { UnauthorizedException } from "../exceptions/unauthorized-exception";
import { UserAuth } from "../models/dtos/user-auth.dto";
import { verifyToken } from "../utils/auth";

export const authAdminMiddleware = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    const authorization = req.headers.authorization;

    await verifyToken(authorization)
    .then((user: UserAuth) => {
        if (user.typeUser !== UserTypeEnum.ADMIN) {
            new ReturnError(res, new UnauthorizedException());
        }else{
            next();
        }
    })
    .catch((error) => {
      new ReturnError(res, error);
    });
}