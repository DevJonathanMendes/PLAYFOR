import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class UserGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const { req } = GqlExecutionContext.create(context).getContext();
		const { access_token: token } = req.headers;

		if (!token) throw new UnauthorizedException();

		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: jwtConstants.secret,
			});
			// We're assigning the payload to the request object here
			// so that we can access it in our route handlers
			req['user'] = payload;
		} catch {
			throw new UnauthorizedException();
		}
		return true;
	}
}
