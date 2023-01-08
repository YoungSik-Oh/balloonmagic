import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MainhistoryService } from './mainhistory.service';

@Controller('mainhistory')
export class MainhistoryController {
  private readonly logger = new Logger(MainhistoryController.name);

  constructor(private readonly mainHistoryService: MainhistoryService) {}

  @Get('')
  getMainHistory() {
    return this.mainHistoryService.getMainHistory();
  }

  @Post('')
  insertMinHistory(
    @Body('city') city: string,
    @Body('location') location: string
  ) {
    return this.mainHistoryService.insertMinHistory(city, location);
  }

  @Patch('/:city')
  updateMainHistory(
    @Param('city') city: string,
    @Body('location') location: string
  ) {
    return this.mainHistoryService.updateMainHistory(city, location);
  }
}
