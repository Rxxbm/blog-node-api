import { PrismaClient } from '@prisma/client'
import { NotFoundException } from '../exceptions/not-found-exception';
import { UserInsertDTO } from '../models/dtos/user-insert.dto';
import { User } from '../models/User'

export const getUsers = async ():Promise<User[]> => {
        const prisma = new PrismaClient();
        const users = await prisma.user.findMany();
        if(users?.length == 0){
            throw new NotFoundException('User');
        }
        return users;
}

export const createUser = async (body:UserInsertDTO):Promise<User> => {
    const prisma = new PrismaClient();

    const userCreated = await prisma.user.create({
        data:body,
    });
    return userCreated;
}