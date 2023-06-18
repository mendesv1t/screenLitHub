import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Book } from '../library/entities/book.entity';
import { LibraryModule } from '../library/library.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'containers-us-west-36.railway.app',
      port: 6859,
      username: 'root',
      password: 'm9VBGko5E4H8MmhKIaRD',
      database: 'railway',
      entities: [Book],
      synchronize: true,
      dropSchema: false,
    }),
    LibraryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
