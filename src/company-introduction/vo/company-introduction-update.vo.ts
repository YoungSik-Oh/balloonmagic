import { PartialType } from '@nestjs/mapped-types';
import { CompanyIntroductionRegistVo } from './company-introduction-regist.vo';

export class CompanyIntroductionUpdateVo extends PartialType(
  CompanyIntroductionRegistVo
) {}
