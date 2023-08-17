import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/auth.middleware";

export const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

router.get('/', authMiddleware, UserController.getAllUsers);

router.post('/', UserController.createOneUser);

router.delete('/:id', UserController.deleteOneUser);

router.patch('/', UserController.editUserPassword);
