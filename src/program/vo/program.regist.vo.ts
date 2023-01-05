import { IsString } from 'class-validator';

export class ProgramRegistVo {
  @IsString()
  readonly category: 'extreme' | 'carnival' | 'store';

  @IsString()
  readonly title: string;

  @IsString()
  readonly contents: string;
}
