import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TestGfc {
	@Field(() => Int, { description: 'Example field (placeholder)' })
	exampleField: number;
}
