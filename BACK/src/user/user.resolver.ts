import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

// Melhor ver um jeito melhor de ocultar informações sensíveis.
@Resolver(() => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Mutation(() => User)
	createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
		return this.userService.create(createUserInput);
	}

	@Query(() => [User])
	async findAll() {
		const users = await this.userService.findAll();
		return users.map((user) => this.excludeSensitiveFields(user));
	}

	@Query(() => User)
	async findOne(@Args('username', { type: () => String }) username: string) {
		const user = await this.userService.findOne(username);
		return this.excludeSensitiveFields(user);
	}

	@Mutation(() => User)
	updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
		return this.userService.update(updateUserInput.username, updateUserInput);
	}

	// Ainda não é possível remover usuário, precisa de autenticação/autorização.
	/* @Mutation(() => User)
	removeUser(@Args('username', { type: () => String }) username: string) {
		return this.userService.remove(username);
	} */

	// Função para excluir a senha do usuário na resposta.
	// Provavelmente precisará de uma refatoração.
	// A coluna password_hash ainda vai aparecer na documentação automática.
	private excludeSensitiveFields(user: User): User {
		return {
			...user,
			password_hash: 'Access denied',
		};
	}

	/* private excludeSensitiveFields<User, Key extends keyof User>(
		data: User | User[],
		keys: Key[],
	): Omit<User, Key> | Omit<User, Key>[] {
		if (Array.isArray(data)) {
			// Caso seja um array de usuários
			return data.map((user) => {
				const filteredObject: Partial<User> = {};

				Object.entries(user).forEach(([key, value]) => {
					if (!keys.includes(key as Key)) {
						filteredObject[key] = value;
					}
				});

				return filteredObject as Omit<User, Key>;
			});
		} else {
			// Caso seja um único usuário
			const filteredObject: Partial<User> = {};

			Object.entries(data).forEach(([key, value]) => {
				if (!keys.includes(key as Key)) {
					filteredObject[key] = value;
				}
			});

			return filteredObject as Omit<User, Key>;
		}
	} */
}
