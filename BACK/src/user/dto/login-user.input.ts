import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class LoginUserInput {
	@Field()
	@Length(1, 32, {
		message: 'The user must have a minimum of 1 and a maximum of 32 characters',
	})
	username: string;

	@Field()
	@Length(1, 32, {
		message:
			'The password must have a minimum of 1 and a maximum of 32 characters',
	})
	password: string;
}
