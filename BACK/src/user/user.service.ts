import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { createHash } from 'crypto';
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

	async login(inputs: LoginUserInput) {
		const { username, password } = inputs;
		const user = await this.prisma.user.findUnique({ where: { username } });

		if (user?.password_hash !== this.HASH(password))
			throw new UnauthorizedException();

		const payload = { username: user.username };

		return {
			// Usando REST o username não precisava estar aqui.
			// O payload já encarregava disso.
			username: user.username,
			access_token: await this.jwtService.signAsync(payload),
		};
	}

	async register(inputs: RegisterUserInput) {
		const { username, email, password } = inputs;
		try {
			await this.prisma.user.create({
				data: {
					username,
					email,
					password_hash: this.HASH(password),
				},
			});
			return inputs;
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError) {
				// The .code property can be accessed in a type-safe manner.
				if (err.code === 'P2002') {
					throw 'Unable to register user, please try again later.';
				}
			}
		}
	}

	private HASH(password: string) {
		const PASSWORD_HASH = this.configService.get<string>('PASSWORD_HASH');

		return createHash('sha256').update(password).digest('hex') + PASSWORD_HASH;
	}
}
