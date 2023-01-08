import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CompanyIntroductionService } from './company-introduction.service';
import { CompanyIntroductionRegistVo } from './vo/company-introduction-regist.vo';
import { CompanyIntroductionUpdateVo } from './vo/company-introduction-update.vo';

@Controller('company-introduction')
export class CompanyIntroductionController {
  private readonly logger = new Logger(CompanyIntroductionController.name);

  constructor(
    private readonly companyIntroductionService: CompanyIntroductionService
  ) {}

  @Get('')
  getIntroduction() {
    return this.companyIntroductionService.getIntroduction();
  }

  @Post('')
  insertIntroduction(@Body() data: CompanyIntroductionRegistVo) {
    return this.companyIntroductionService.insertIntroduction(data);
  }

  @Patch('/:uuid')
  updateIntroduction(
    @Param('uuid') uuid: string,
    @Body() data: CompanyIntroductionUpdateVo
  ) {
    return this.companyIntroductionService.updateIntroduction(uuid, data);
  }
}
