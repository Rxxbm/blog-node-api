import express from 'express';
import { userRouter } from './routes/user-router';

const app = express();

app.use(express.json());

app.use(userRouter);

app.listen(8080, () => {
    console.log('Server is running');
});