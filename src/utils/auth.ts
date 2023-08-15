import { User } from "../models/User";
import { sign, verify } from "jsonwebtoken";
import { UnauthorizedException } from "../exceptions/unauthorized-exception";
import { UserAuth } from "../models/dtos/user-auth.dto";
import { Request } from 'express';

export const PASSWORD_JWT = 'umasenhamuitograndedepoismudar';

export const generateToken = (user: User): string => {
  return sign(
    {
      userId: user.id,
      email: user.email,
      typeUser: user.typeUser,
    } as UserAuth,
    PASSWORD_JWT,
    {
      subject: String(user.id),
      expiresIn: '6048000000',
    },
  );
};

export const verifyToken = async (authorization?: string): Promise<UserAuth> => {
  if (!authorization) {
    throw new UnauthorizedException();
  }

  const [, token] = authorization.split(' ');

  try {
    const decodedToken = <UserAuth>verify(token, PASSWORD_JWT);

    return decodedToken;
  } catch (error) {
    throw new UnauthorizedException();
  }
};

export const getUserByToken = async (req: Request): Promise<UserAuth> => {
  const authorization = req.headers.authorization;

  return verifyToken(authorization);
};