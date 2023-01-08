import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/@database/database.module';
import { MainhistoryController } from './mainhistory.controller';
import { MainhistoryService } from './mainhistory.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MainhistoryController],
  providers: [MainhistoryService],
})
export class MainhistoryModule {}
