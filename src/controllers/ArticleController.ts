import { Response, Request } from "express";
import { ReturnError } from "../exceptions/dto/return-error.dto";
import { ArticleInsertDTO } from "../models/dtos/article-insert.dto";
import { UserAuth } from "../models/dtos/user-auth.dto";
import { createArticle, getArticles } from "../services/article-services";
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
}