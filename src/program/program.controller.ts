import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramRegistVo } from './vo/program.regist.vo';
import { ProgramUpdateVo } from './vo/program.update.vo';

@Controller('program')
export class ProgramController {
  private readonly logger = new Logger(ProgramController.name);

  constructor(private readonly programService: ProgramService) {}

  @Get('/:ctgy')
  getProgram(@Param('ctgy') ctgy) {
    return this.programService.getProgram(ctgy);
  }

  @Post('')
  insertProgram(@Body() data: ProgramRegistVo) {
    return this.programService.insertProgram(data);
  }

  @Patch('/:ctgy/:uuid')
  updateProgram(
    @Param('ctgy') ctgy,
    @Param('uuid') uuid: string,
    @Body() data: ProgramUpdateVo
  ) {
    return this.programService.updateProgram(ctgy, uuid, data);
  }
}
