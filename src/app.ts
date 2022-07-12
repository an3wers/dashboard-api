import express, { Express } from "express";
import { userRouter } from "./users/users.js";
import { Server } from "http";
import { LoggerService } from "./logger/logger.service.js";

export class App {
  // Типы
  app: Express;
  port: number;
  server: Server;
  logger: LoggerService;
  
  constructor(logger: LoggerService) {
    this.app = express();
    this.port = 8000;
    this.logger = logger
  }

  useRoutes() {
    this.app.use("/users", userRouter);
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port)
    // console.log(`Сервер запушен: http://localhost:${this.port}`)
    this.logger.log(`Сервер запушен: http://localhost:${this.port}`)
  }
}
