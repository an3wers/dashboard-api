import express, { Express } from "express";
// import { userRouter } from "./users/users.js";
import { Server } from "http";
import { ExeptionFilter } from "./errors/exeption.filter.js";
import { LoggerService } from "./logger/logger.service.js";
import { UserController } from "./users/users.controller.js";

export class App {
  // Типы
  app: Express;
  port: number;
  server: Server;
  logger: LoggerService;
  userController: UserController
  exeptionFilter: ExeptionFilter
  
  constructor(logger: LoggerService, userController: UserController, exeptionFilter: ExeptionFilter) {
    this.app = express();
    this.port = 8000;
    this.logger = logger
    this.userController = userController
    this.exeptionFilter = exeptionFilter
  }

  useRoutes() {
    this.app.use("/users", this.userController.router);
  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
  }

  public async init() {
    this.useRoutes();
    this.useExeptionFilters()
    this.server = this.app.listen(this.port)
    // console.log(`Сервер запушен: http://localhost:${this.port}`)
    this.logger.log(`Сервер запушен: http://localhost:${this.port}`)
  }
}
