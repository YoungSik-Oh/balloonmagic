import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/@database/database.module';
import { InquireController } from './inquire.controller';
import { InquireService } from './inquire.service';

@Module({
  imports: [DatabaseModule],
  controllers: [InquireController],
  providers: [InquireService],
})
export class InquireModule {}
