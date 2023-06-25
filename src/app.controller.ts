import {
  Controller,
  Get,
  Request,
  Post,
  Res,
  HttpStatus,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { Public } from './decorator/public';
import { Role } from './decorator/role';
import { roles } from './auth/constants';
import { User } from './decorator/user';

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

  @Get('user')
  async getUser(@Request() req, @User() user) {
    const usuario = await this.usersService.findOne(user.login);

    delete usuario.password;
    delete usuario.id;

    usuario.keys = [];
    usuario.keys = usuario.books.map((b) => b.key);

    return usuario;
  }

  @Put('/collection/:id')
  async addCollection(@Res() response, @Param('id') id, @User() user) {
    const book = await this.usersService.addCollection(id, user);
    return response.status(HttpStatus.OK).json({
      book,
    });
  }

  @Delete('/collection/:id')
  async removeCollection(@Param('id') id, @User() user) {
    await this.usersService.removeCollection(id, user);
  }

  @Delete('/collectionKey')
  async removeCollectionByKey(@Query('query') key, @User() user) {
    await this.usersService.removeCollectionByKey(key, user);
  }

  @Public()
  @Get()
  status(): string {
    return 'Esta é a API do projeto ScreenLitHub';
  }
}
