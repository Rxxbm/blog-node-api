import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authAdminMiddleware } from "../middlewares/auth-admin.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

export const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

router.get('/', authAdminMiddleware, UserController.getAllUsers);

router.post('/', UserController.createOneUser);

router.delete('/:id', authAdminMiddleware,UserController.deleteOneUser);

router.patch('/', authMiddleware, UserController.editUserPassword);
