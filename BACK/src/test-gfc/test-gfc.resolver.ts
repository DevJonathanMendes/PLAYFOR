import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TestGfcService } from './test-gfc.service';
import { TestGfc } from './entities/test-gfc.entity';
import { CreateTestGfcInput } from './dto/create-test-gfc.input';
import { UpdateTestGfcInput } from './dto/update-test-gfc.input';

@Resolver(() => TestGfc)
export class TestGfcResolver {
	constructor(private readonly testGfcService: TestGfcService) {}

	@Mutation(() => TestGfc)
	createTestGfc(
		@Args('createTestGfcInput') createTestGfcInput: CreateTestGfcInput,
	) {
		return this.testGfcService.create(createTestGfcInput);
	}

	@Query(() => [TestGfc], { name: 'testGfc' })
	findAll() {
		return this.testGfcService.findAll();
	}

	@Query(() => TestGfc, { name: 'testGfc' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.testGfcService.findOne(id);
	}

	@Mutation(() => TestGfc)
	updateTestGfc(
		@Args('updateTestGfcInput') updateTestGfcInput: UpdateTestGfcInput,
	) {
		return this.testGfcService.update(
			updateTestGfcInput.id,
			updateTestGfcInput,
		);
	}

	@Mutation(() => TestGfc)
	removeTestGfc(@Args('id', { type: () => Int }) id: number) {
		return this.testGfcService.remove(id);
	}
}
