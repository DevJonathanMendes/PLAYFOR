import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private configService: ConfigService,
	) {}

	async create(createUserInput: CreateUserInput) {
		return await this.prisma.user.create({
			data: {
				username: createUserInput.username,
				email: createUserInput.email,
				password_hash:
					createHash('sha256')
						.update(createUserInput.password_hash)
						.digest('hex') + this.configService.get<string>('PASSWORD_HASH'),
			},
		});
	}

	findAll() {
		return this.prisma.user.findMany();
	}

	findOne(username: string) {
		return this.prisma.user.findUnique({
			where: { username },
		});
	}

	update(username: string, updateUserInput: UpdateUserInput) {
		return this.prisma.user.update({
			where: { username },
			data: {
				username: updateUserInput.username,
				email: updateUserInput.email,
				password_hash: createHash('sha256')
					.update(updateUserInput.password_hash)
					.digest('hex'),
			},
		});
	}

	// Ainda não é possível remover usuário, precisa de autenticação/autorização.
	/* remove(username: string) {
		return this.prisma.user.delete({ where: { username } });
	} */
}
