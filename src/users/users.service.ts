import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { roles } from '../auth/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(login: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        login: login,
      },
    });
  }

  createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
