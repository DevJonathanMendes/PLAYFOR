import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
		private configService: ConfigService,
	) {}

	async login(updateUserInput: UpdateUserInput) {
		const { username, password } = updateUserInput;
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

	private HASH(password: string) {
		const PASSWORD_HASH = this.configService.get<string>('PASSWORD_HASH');

		return createHash('sha256').update(password).digest('hex') + PASSWORD_HASH;
	}
}
