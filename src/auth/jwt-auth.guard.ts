import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorator/public';
import { ROLE_KEY } from '../decorator/role';
import jwtDecode from 'jwt-decode';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const role = this.reflector.getAllAndOverride<string>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    if (role) {
      const payload = this.getPayload(context);

      if (!!payload && role !== payload.role) {
        return false;
      }
    }

    return super.canActivate(context);
  }

  getPayload(context: ExecutionContext): any {
    const request = context.switchToHttp().getRequest<Request>();

    const header = request.headers['authorization'];

    if (header) {
      const jwt = header.replace('Bearer ', '');

      return jwtDecode(jwt);
    }

    return null;
  }
}
