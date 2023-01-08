import { PartialType } from '@nestjs/mapped-types';
import { MainScreenRegistVo } from './mainscreen-regist.vo';

export class MainScreenUpdateVo extends PartialType(MainScreenRegistVo) {}
