import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfigService } from '../../config/config.service.interface';
import { IUsersRepository } from '../users.repository.interface';
import { IUserService } from '../user.service.interface';
import { TYPES } from '../../types';
import { UserService } from '../users.service';
import { User } from '../user.entity';
import { UserModel } from '@prisma/client';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
	create: jest.fn(),
	find: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	usersService = container.get<IUserService>(TYPES.UserService);
});

let createdUser: UserModel | null;

describe('User Service', () => {
	it('create user', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce((user: User): UserModel => {
			return {
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			};
		});
		createdUser = await usersService.createUser({
			email: 'test@example.com',
			name: 'Jhon Doe',
			password: '123456',
		});

		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('123456');
	});

	it('validate user - success', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);

		const result = await usersService.validateUser({
			email: 'test@example.com',
			password: '123456',
		});

		expect(result).toBeTruthy();
	});

	it('validate user - not valid password', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);

		const result = await usersService.validateUser({
			email: 'test@example.com',
			password: '12345',
		});

		expect(result).toBeFalsy();
	});

	it('validate user - not valid user', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);

		const result = await usersService.validateUser({
			email: 'test2@example.com',
			password: '12345',
		});

		expect(result).toBeFalsy();
	});
});
