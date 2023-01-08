import { PartialType } from '@nestjs/mapped-types';
import { ProgramRegistVo } from './program.regist.vo';

export class ProgramUpdateVo extends PartialType(ProgramRegistVo) {}
