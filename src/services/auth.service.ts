import { MissingParamException } from "../exceptions/missing-param-exception";
import { NotFoundException } from "../exceptions/not-found-exception";
import { AuthModel } from "../models/Auth";
import { AuthDTO } from "../models/dtos/auth.dto";
import { generateToken } from "../utils/auth";
import { validatePassword } from "../utils/password";
import { getUserByEmail } from "./user-services";


export const validateAuth = async (authDto: AuthDTO): Promise<AuthModel> => {
  const requiredParams = ['email', 'password'];

  for (const param of requiredParams) {
      if (!authDto[param]) {
          throw new MissingParamException(param);
      }
  }
    const user = await getUserByEmail(authDto.email);
  
    const isValidPassword = await validatePassword(authDto.password, user.password);
  
    if (!isValidPassword) {
      throw new NotFoundException('User');
    }
  
    return new AuthModel(generateToken(user), user);
  };