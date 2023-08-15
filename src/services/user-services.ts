import { PrismaClient } from '@prisma/client'
import { BadRequestException } from '../exceptions/bad-request-exception';
import { MissingParamException } from '../exceptions/missing-param-exception';
import { NotFoundException } from '../exceptions/not-found-exception';
import { UserInsertDTO } from '../models/dtos/user-insert.dto';
import { User } from '../models/User'
import { createPasswordHashed } from '../utils/password';

export const getUsers = async ():Promise<User[]> => {
        const prisma = new PrismaClient();
        const users = await prisma.user.findMany();
        if(users?.length == 0){
            throw new NotFoundException('User');
        }
        return users;
}

export const createUser = async (body:UserInsertDTO):Promise<User> => {
    
    const requiredParams = ['email', 'name', 'password', 'typeUser'];

    for (const param of requiredParams) {
        if (!body[param]) {
            throw new MissingParamException(param);
        }
    }
    
    const prisma = new PrismaClient();

    const userEmail = await getUserByEmail(body.email).catch(() => undefined);

    if (userEmail) {
        throw new BadRequestException('Email already exists');
    }

    const user: UserInsertDTO = {
        ...body,
        password: await createPasswordHashed(body.password),
    }

    const userCreated = await prisma.user.create({
        data:user,
    });
    return userCreated;
}

export const getUserByEmail = async (email:string):Promise<User>  => {
    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
        where: {
            email: email,
        }
    });
    if (!user) {
        throw new NotFoundException('User');
    }
    return user;
}

