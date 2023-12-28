import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class RegisterUserInput {
	@Field()
	@Length(1, 32, {
		message: 'The user must have a minimum of 1 and a maximum of 32 characters',
	})
	username: string;

	@Field()
	@IsEmail()
	email: string;

	@Field()
	@Length(1, 32, {
		message:
			'The password must have a minimum of 1 and a maximum of 32 characters',
	})
	password: string;
}
