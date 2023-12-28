import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { EventsModule } from './events/events.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			includeStacktraceInErrorResponses: false,
			formatError(formattedError) {
				const { message, path } = formattedError;
				const { status } = formattedError.extensions;

				return {
					message,
					path,
					status,
				};
			},
		}),
		ConfigModule.forRoot(),
		UserModule,
		EventsModule,
	],
	controllers: [AppController],
	providers: [PrismaService, UserService],
})
export class AppModule {}
