import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Book } from './library/entities/book.entity';
import { LibraryModule } from './library/library.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'containers-us-west-108.railway.app',
      port: 7598,
      username: 'root',
      password: 'RzgDcvwotwU0QSrOF394',
      database: 'railway',
      entities: [Book],
      synchronize: true,
      dropSchema: false
    }), LibraryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}