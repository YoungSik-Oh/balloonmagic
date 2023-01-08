import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Logger } from 'winston';
import { CompanyInfoService } from './companyinfo.service';
import { CompanyInfoRegistVo } from './vo/companyInfo-regist.vo';
import { CompanyInfoUpdateVo } from './vo/companyInfo-update.vo';

@Controller('companyinfo')
export class CompanyInfoController {
  constructor(private readonly companyInfoService: CompanyInfoService) {}

  @Get()
  getCompanyInfo() {
    return this.companyInfoService.getCompanyInfo();
  }

  @Post()
  createCompanyInfo(@Body() data: CompanyInfoRegistVo) {
    return this.companyInfoService.createCompanyInfo(data);
  }

  @Patch('/:uuid')
  updateCompanyInfo(
    @Param('uuid') uuid: string,
    @Body() data: CompanyInfoUpdateVo
  ) {
    return this.companyInfoService.updateCompanyInfo(uuid, data);
  }
}
