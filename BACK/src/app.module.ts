import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestGfcModule } from './test-gfc/test-gfc.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: true,
		}),
		TestGfcModule,
		UsersModule,
		ConfigModule.forRoot(),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
