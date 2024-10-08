import { inject, injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import 'reflect-metadata';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}

	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const existedUser = await this.usersRepository.find(email);

		if (existedUser) {
			return null;
		}
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const createdUser = await this.usersRepository.create(newUser);

		return createdUser;
	}
	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.usersRepository.find(email);

		if (!existedUser) {
			return false;
		}

		const verifiedUser = new User(existedUser.email, existedUser.name, existedUser.password);
		const isverified = await verifiedUser.comparePassword(password);

		return isverified;
	}
	async getUserInfo(email: string): Promise<UserModel | null> {
		const findUser = await this.usersRepository.find(email);
		return findUser;
	}
}
