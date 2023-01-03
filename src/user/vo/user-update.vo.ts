import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { UserRegistVo } from './user-regist.vo';

export class UserUpdateVo extends PartialType(UserRegistVo) {
  // @IsString()
  // @MaxLength(50)
  // @IsOptional()
  // readonly name?: string;
  // @IsString()
  // @MaxLength(255)
  // @IsOptional()
  // readonly pwd?: string;
  // @IsString()
  // @MaxLength(100)
  // @Matches(
  //   /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  // )
  // @IsOptional()
  // readonly email: string;
  // @IsString()
  // @MaxLength(20)
  // @IsOptional()
  // phone: string;
  // @IsString()
  // @MaxLength(20)
  // @IsOptional()
  // authority?: string;
}
