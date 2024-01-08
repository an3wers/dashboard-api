import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect() {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] Успешно подключились к БД');
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error('[PrismaService] Ошибка подключения к БД: ' + error.message);
			}
		}
	}

	async disconnect() {
		await this.client.$disconnect();
	}
}
