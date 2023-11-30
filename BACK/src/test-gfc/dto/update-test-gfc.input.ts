import { CreateTestGfcInput } from './create-test-gfc.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTestGfcInput extends PartialType(CreateTestGfcInput) {
	@Field(() => Int)
	id: number;
}
