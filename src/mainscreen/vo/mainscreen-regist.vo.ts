import { IsString } from 'class-validator';

export class MainScreenRegistVo {
  @IsString()
  sign_post: string;

  @IsString()
  youtube: string;

  @IsString()
  instargram: string;

  @IsString()
  facebook: string;
}
