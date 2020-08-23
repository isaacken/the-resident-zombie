import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

class AppController {
  public express: express.Application;

  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes() {
    this.express.use(routes);
  }
}

export default new AppController().express