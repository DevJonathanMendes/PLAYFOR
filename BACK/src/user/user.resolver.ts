import { UseFilters, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginUserInput } from 'src/user/dto/login-user.input';
import { RegisterUserInput } from './dto/register-user.input';
import { User } from './entities/User.entity';
import { UserExceptionFilter } from './user.filter';
import { UserGuard } from './user.guard';
import { UserService } from './user.service';

@UseFilters(UserExceptionFilter)
@Resolver(() => User)
export class UserResolver {
	constructor(private userService: UserService) {}

	@UseGuards(UserGuard)
	@Query(() => String)
	async findOne() {
		return 'user';
	}

	@Mutation(() => User)
	loginUser(@Args('User') user: LoginUserInput) {
		return this.userService.login(user);
	}

	@Mutation(() => User)
	registerUser(@Args('User') user: RegisterUserInput) {
		return this.userService.register(user);
	}
}
