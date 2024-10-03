import express, { Express } from 'express';
import { Server } from 'http';
import { UserController } from './users/users.controller';
import { ILogger } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata';
// import { IUserController } from './users/users.interface';
import { IConfigService } from './config/config.service.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './common/auth.middleware';

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;
	private logger: ILogger;
	private userController: UserController;
	private exeptionFilter: IExeptionFilter;
	private configService: IConfigService;
	private prismaService: PrismaService;

	constructor(
		@inject(TYPES.ILogger) logger: ILogger,
		@inject(TYPES.UserController) userController: UserController,
		@inject(TYPES.ExeptionFilter) exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) configService: IConfigService,
		@inject(TYPES.PrismaService) prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
		this.logger = logger;
		this.userController = userController;
		this.exeptionFilter = exeptionFilter;
		this.configService = configService;
		this.prismaService = prismaService;
	}

	useMiddlerware() {
		this.app.use(express.json());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	useRoutes() {
		this.app.use('/users', this.userController.router);
	}

	useExeptionFilters() {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init() {
		this.useMiddlerware();
		this.useRoutes();
		this.useExeptionFilters();

		await this.prismaService.connect();

		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запушен: http://localhost:${this.port}`);
	}

	public close() {
		this.server.close();
	}
}
