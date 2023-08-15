import { AppException } from '../app-exception';
import { Response } from 'express';

export class ReturnError {
  error: boolean;
  message: string;
  statusCode?: number;

  constructor(res: Response, error: Error) {
    this.error = true;
    this.message = error.message;

    if (error instanceof AppException) {
      this.statusCode = error.statusCode;
    }

    res.status(this.statusCode || 500).send(this);
  }
}