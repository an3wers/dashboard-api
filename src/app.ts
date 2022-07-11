import express, { Express } from "express";
import { userRouter } from "./users/users.js";
import { Server } from "http";

export class App {
  // Типы
  app: Express;
  port: number;
  server: Server;

  constructor() {
    this.app = express();
    this.port = 8000;
  }

  useRoutes() {
    this.app.use("/users", userRouter);
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port)
    console.log(`Сервер запушен: http://localhost:${this.port}`)
  }
}
