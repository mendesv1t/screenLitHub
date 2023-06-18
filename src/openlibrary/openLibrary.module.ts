import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OpenLibraryService } from './openLibrary.service';
import { OpenLibraryController } from './openLibrary.controller';

@Module({
  imports: [HttpModule],
  providers: [OpenLibraryService],
  controllers: [OpenLibraryController],
})
export class OpenLibraryModule {}
