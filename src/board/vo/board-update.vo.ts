import { IsString, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { BoardRegistVo } from './board-regist.vo';

export class BoardUpdateVo extends PartialType(BoardRegistVo) {}
