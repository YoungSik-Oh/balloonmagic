import { PartialType } from '@nestjs/mapped-types';
import { InquireRegistVo } from './inquire.regist.vo';

export class InquireUpdateVo extends PartialType(InquireRegistVo) {}
