import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InquireService } from './inquire.service';
import { InquireRegistVo } from './vo/inquire.regist.vo';
import { InquireUpdateVo } from './vo/inquire.update.vo';

@Controller('inquire')
export class InquireController {
  private readonly logger = new Logger(InquireController.name);
  constructor(private readonly inquireService: InquireService) {}

  @Get('')
  getEmail() {
    return this.inquireService.getEmail();
  }

  @Post('')
  insertEmail(@Body() data: InquireRegistVo) {
    return this.inquireService.insertEmail(data);
  }

  @Patch('/:uuid')
  updateEmail(@Param('uuid') uuid: string, @Body() data: InquireUpdateVo) {
    return this.inquireService.updateEmail(uuid, data);
  }
}
