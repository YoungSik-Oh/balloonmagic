import { IsString } from 'class-validator';

export class CompanyIntroductionRegistVo {
  @IsString()
  readonly main_title: string;

  @IsString()
  readonly sub_title: string;

  @IsString()
  readonly contents: string;
}
