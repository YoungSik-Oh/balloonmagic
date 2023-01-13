import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { VisitantService } from './visitant.service';

@Controller('visitant')
export class VisitantController {
  private readonly logger = new Logger(VisitantController.name);

  constructor(private readonly visitantService: VisitantService) {}

  @Get('/all')
  getVisit() {
    return this.visitantService.getVisit();
  }

  @Post('/add/count/:date')
  addVisitCount(@Param('date') date: string, @Query('flag') flag: number) {
    return this.visitantService.addVisitCount(flag, date);
  }

  @Get('/dashboard')
  getDashBoardData() {
    return this.visitantService.getDashBoardData();
  }
}
