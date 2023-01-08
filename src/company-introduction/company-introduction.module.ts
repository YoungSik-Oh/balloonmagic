import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/@database/database.module';
import { CompanyIntroductionController } from './company-introduction.controller';
import { CompanyIntroductionService } from './company-introduction.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CompanyIntroductionController],
  providers: [CompanyIntroductionService],
})
export class CompanyIntroductionModule {}
