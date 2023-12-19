import { Catch, HttpException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { GraphQLError } from 'graphql';

const { PrismaClientKnownRequestError: PrismaError } = Prisma;

@Catch(GraphQLError, PrismaError)
export class UserExceptionFilter implements GqlExceptionFilter {
	catch(err: HttpException) {
		if (err instanceof PrismaError && err.code === 'P2002') {
			throw new GraphQLError(
				`Unique constraint failed on the ${err.meta.target}`,
				{
					extensions: {
						code: err.code,
					},
				},
			);
		}

		throw new GraphQLError('Something went wrong, please try again later.');
	}
}
