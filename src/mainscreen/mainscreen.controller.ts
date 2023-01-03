import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MainscreenService } from './mainscreen.service';
import { MainScreenRegistVo } from './vo/mainscreen-regist.vo';
import { MainScreenUpdateVo } from './vo/mainscreen-update.vo';

@Controller('mainscreen')
export class MainscreenController {
  private readonly logger = new Logger(MainscreenController.name);

  constructor(private readonly mainscreenService: MainscreenService) {}

  @Get()
  getMainScreen() {
    return this.mainscreenService.getMainScreen();
  }

  @Post()
  insertMainScreen(@Body() data: MainScreenRegistVo) {
    return this.mainscreenService.insertMainScreen(data);
  }

  @Patch('/:uuid')
  updateMainScreen(
    @Param('uuid') uuid: string,
    @Body() data: MainScreenUpdateVo
  ) {
    return this.mainscreenService.updateMainScreen(uuid, data);
  }
}
