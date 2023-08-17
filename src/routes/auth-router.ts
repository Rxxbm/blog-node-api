import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

export const authRouter = Router();

const router = Router();

authRouter.use('/auth', router);

router.post('/', AuthController.authenticateUser);
