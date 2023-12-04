import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
	@Field()
	username: string;

	@Field()
	password: string;
}
