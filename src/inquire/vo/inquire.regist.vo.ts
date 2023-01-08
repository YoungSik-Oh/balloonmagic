import { IsString } from 'class-validator';

export class InquireRegistVo {
  @IsString()
  readonly email: string;
}
