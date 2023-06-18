import { Controller, Get, Request, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { Public } from './decorator/public';
import { Role } from './decorator/role';
import { roles } from './auth/constants';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Public()
  @Post('auth/createUser')
  async createUser(@Request() req) {
    await this.usersService.createUser(req.body);
  }

  @Role(roles.ADMIN)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
