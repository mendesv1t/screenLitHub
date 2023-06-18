import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Book } from './library/entities/book.entity';
import { LibraryModule } from './library/library.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { User } from './users/user.entity';
import { OpenLibraryModule } from './openlibrary/openLibrary.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'containers-us-west-84.railway.app',
      port: 6400,
      username: 'root',
      password: 'ltI9agSU2BttfZXQiBuA',
      database: 'railway',
      entities: [Book, User],
      synchronize: true,
      dropSchema: false,
    }),
    LibraryModule,
    AuthModule,
    UsersModule,
    OpenLibraryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
