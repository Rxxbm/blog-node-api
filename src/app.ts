import express from 'express';
import { articleRouter } from './routes/article-router';
import { authRouter } from './routes/auth-router';
import { userRouter } from './routes/user-router';

const app = express();

app.use(express.json());

app.use(userRouter);

app.use(authRouter);

app.use(articleRouter);

app.listen(8080, () => {
    console.log('Server is running');
});