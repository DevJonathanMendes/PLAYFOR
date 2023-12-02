import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
	@Field()
	username: string;

	@Field()
	email: string;

	@Field()
	password_hash: string;
}
