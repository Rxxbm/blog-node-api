import { Router } from "express";
import { ArticleController } from "../controllers/ArticleController";
import { authMiddleware } from "../middlewares/auth.middleware";

export const articleRouter = Router();

const router = Router();

articleRouter.use('/article', router);

router.get('/', authMiddleware, ArticleController.getAllArticles);

router.post('/', authMiddleware, ArticleController.createOneArticle);

