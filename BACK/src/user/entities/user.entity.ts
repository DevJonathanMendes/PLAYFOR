import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
	@Field({ nullable: true })
	username: string;

	@Field({ nullable: true })
	email: string;

	@Field({ nullable: true })
	access_token: string;
}
