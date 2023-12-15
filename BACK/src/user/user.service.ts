import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserInput } from './dto/login-user.input';
import { RegisterUserInput } from './dto/register-user.input';

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
		private configService: ConfigService,
	) {}

	async login({ username, password }: LoginUserInput) {
		const user = await this.prisma.user.findUnique({ where: { username } });

		if (!user) throw new GraphQLError('User Does Not Exist');

		if (user.password_hash !== this.passwordHash(password))
			throw new GraphQLError('Incorrect Password');

		return {
			username,
			email: user.email,
			access_token: await this.jwtService.signAsync({ username }),
		};
	}

	async register({ username, email, password }: RegisterUserInput) {
		await this.prisma.user.create({
			data: {
				username,
				email,
				password_hash: this.passwordHash(password),
			},
		});

		return {
			username,
			email,
			access_token: await this.jwtService.signAsync({ username, email }),
		};
	}

	private passwordHash(password: string) {
		const PASSWORD_HASH = this.configService.get<string>('PASSWORD_HASH');

		return createHash('sha256')
			.update(password + PASSWORD_HASH)
			.digest('hex');
	}
}
