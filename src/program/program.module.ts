import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/@database/database.module';
import { ProgramController } from './program.controller';
import { ProgramService } from './program.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProgramController],
  providers: [ProgramService],
})
export class ProgramModule {}
