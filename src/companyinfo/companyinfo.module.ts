import { Module } from '@nestjs/common';
import { CompanyInfoService } from './companyinfo.service';
import { CompanyInfoController } from './companyinfo.controller';
import { DatabaseModule } from 'src/@database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CompanyInfoService],
  controllers: [CompanyInfoController],
})
export class CompanyinfoModule {}
