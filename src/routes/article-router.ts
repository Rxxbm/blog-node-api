import { Router } from "express";
import { ArticleController } from "../controllers/ArticleController";
import { authAdminMiddleware } from "../middlewares/auth-admin.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

export const articleRouter = Router();

const router = Router();

articleRouter.use('/article', router);

router.get('/', authMiddleware, ArticleController.getAllArticles);

router.post('/', authMiddleware, ArticleController.createOneArticle);

router.put('/:id', authMiddleware, ArticleController.editOneArticle);

router.delete('/:id', authAdminMiddleware, ArticleController.deleteOneArticle);