import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';

import { User } from './user.entity';
import { BookModule } from '../book/book.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), BookModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
