import { Response, Request } from "express";
import { BadRequestException } from "../exceptions/bad-request-exception";
import { ReturnError } from "../exceptions/dto/return-error.dto";
import { ArticleInsertDTO } from "../models/dtos/article-insert.dto";
import { UserAuth } from "../models/dtos/user-auth.dto";
import { createArticle, editArticle, getArticles } from "../services/article-services";
import { getUserByToken } from "../utils/auth";
export class ArticleController {
    public static async getAllArticles(__, res:Response):Promise<Response>{
        try{
            const articles = await getArticles();
            return res.status(200).json(articles);
        }catch(error){
            new ReturnError(res, error);
        }
    }
    public static async createOneArticle(req: Request<undefined, undefined, ArticleInsertDTO>, res:Response):Promise<Response>{
        try{
            const userID = await getUserByToken(req).then((user: UserAuth) => user.userId);

            const user = await createArticle(req.body, userID);
            return res.status(200).json(user);
        }catch(error){
            new ReturnError(res, error);
        }
    }
    public static async editOneArticle(req: Request, res:Response):Promise<Response>{
        const isInteger = (value: string) => {
            return /^\d+$/.test(value);
        };
        const validate = isInteger(req.params.id);
        const articleID = parseInt(req.params.id);
        if (!validate) {
            new ReturnError(res, new BadRequestException('id must be a integer'));    
        }else{
            try{
                const userID = await getUserByToken(req).then((user: UserAuth) => user.userId);

                const article = await editArticle(articleID, req.body, userID);
                return res.status(200).json(article);
            }catch(error){
                new ReturnError(res, error);
            }
        }
    }
}