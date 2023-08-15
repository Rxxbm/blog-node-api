import { Router } from "express";
import { UserController } from "../controllers/UserController";

export const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

router.get('/', UserController.getAllUsers);
router.post('/', UserController.createOneUser);
