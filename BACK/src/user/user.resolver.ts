import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginUserInput } from 'src/user/dto/login-user.input';
import { User, UserToken } from 'src/user/entities/user.entity';
import { UserGuard } from './user.guard';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
	constructor(private userService: UserService) {}

	@UseGuards(UserGuard)
	@Query(() => String)
	async findOne() {
		return 'user';
	}

	@Mutation(() => UserToken)
	loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
		return this.userService.login(loginUserInput);
	}
}
