import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateUserInput } from 'src/user/dto/update-user.input';
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
	updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
		return this.userService.login(updateUserInput);
	}
}
