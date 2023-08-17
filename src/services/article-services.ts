import { PrismaClient } from '@prisma/client'
import { MissingParamException } from '../exceptions/missing-param-exception';
import { NotFoundException } from '../exceptions/not-found-exception';
import { Article } from '../models/Article';
import { ArticleInsertDTO } from '../models/dtos/article-insert.dto';


export const getArticles = async ():Promise<Article[]> => {
        const prisma = new PrismaClient();
        const articles = await prisma.article.findMany();
        if(articles?.length == 0){
            throw new NotFoundException('article');
        }
        return articles;
}

export const createArticle = async (body:ArticleInsertDTO, userID: number):Promise<Article> => {
    
    const requiredParams= ['title', 'body', 'category'];

    for (const param of requiredParams) {
        if (!body[param]) {
            throw new MissingParamException(param);
        }
    }
    

    const article = {
        ...body,
        userID,
    } 

    const prisma = new PrismaClient();

    const userCreated = await prisma.article.create({
        data:article,
    });
    return userCreated;
}