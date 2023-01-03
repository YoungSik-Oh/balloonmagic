import { IsString, MaxLength } from 'class-validator';
import { BaordCategory } from 'src/@database/entity/board.entity';

export class BoardRegistVo {
  @IsString()
  // @MaxLength(30)
  category: 'concert' | 'planning' | 'education' | 'etc';

  @IsString()
  title: string;

  @IsString()
  contents: string;

  @IsString()
  writerID: any;
}
