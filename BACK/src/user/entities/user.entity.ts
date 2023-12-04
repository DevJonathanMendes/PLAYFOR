import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
	@Field()
	username: string;

	@Field()
	email: string;

	@Field()
	password: string;
}

@ObjectType()
export class UserToken {
	@Field()
	username: string;

	@Field()
	access_token: string;
}
