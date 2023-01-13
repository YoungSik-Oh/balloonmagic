import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/@database/database.module';
import { VisitantController } from './visitant.controller';
import { VisitantService } from './visitant.service';

@Module({
  imports: [DatabaseModule],
  controllers: [VisitantController],
  providers: [VisitantService],
})
export class VisitantModule {}
