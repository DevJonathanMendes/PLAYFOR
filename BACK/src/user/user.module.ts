import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { jwtConstants } from './constants';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '12h' },
		}),
		ConfigModule,
	],
	exports: [UserService],
	providers: [UserService, UserResolver, PrismaService],
})
export class UserModule {}
