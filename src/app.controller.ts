import { Controller, Get, Request, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Public } from './decorator/public';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Public()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
