import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import cors from 'cors';
import AppError from './errors/AppError';
import router from './routes';

require('./shared/database/database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof Error && err.joi.details[0].message) {
    return response.status(400).json({
      status: 'error',
      message: err.joi.details[0].message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

console.log('Server running on port 3000!');

export default app;
