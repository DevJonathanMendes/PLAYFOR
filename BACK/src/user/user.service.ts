import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
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

		if (user?.username === undefined)
			throw new NotFoundException('User not exists');

		if (user?.password_hash !== this.hash(password))
			throw new UnauthorizedException('Incorrect password');

		const payload = { username };
		return {
			...payload,
			access_token: await this.jwtService.signAsync(payload),
		};
	}

	async register(inputs: RegisterUserInput) {
		const { username, email, password } = inputs;

		await this.prisma.user.create({
			data: {
				username,
				email,
				password_hash: this.hash(password),
			},
		});

		const payload = { username, email };

		return {
			...payload,
			access_token: await this.jwtService.signAsync(payload),
		};
	}

	private hash(password: string) {
		const PASSWORD_HASH = this.configService.get<string>('PASSWORD_HASH');

		return createHash('sha256')
			.update(password + PASSWORD_HASH)
			.digest('hex');
	}
}
