import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { BaordCategory } from 'src/@database/entity/board.entity';
import { BoardService } from './board.service';
import { BoardRegistVo } from './vo/board-regist.vo';
import { BoardUpdateVo } from './vo/board-update.vo';

@Controller('board')
export class BoardController {
  private readonly logger = new Logger(BoardController.name);

  constructor(private readonly boardService: BoardService) {}

  @Get('')
  getAllBoard(
    // @Param('ctgy') ctgy: BaordCategory,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10
  ) {
    return this.boardService.getAllBoard({ page, limit });
  }

  @Post('/search')
  findBoard(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Body() conditions: { title: string; contents: string }
  ) {
    return this.boardService.findBoard({ page, limit }, conditions);
  }

  @Get('/detail/:ctgy/:uuid')
  findOneBoard(
    @Param('ctgy') ctgy: BaordCategory,
    @Param('uuid') uuid: string
  ) {
    return this.boardService.findOneBoard(uuid, ctgy);
  }

  @Post()
  // @UseInterceptors(AnyFilesInterceptor()) -- 첨부파일
  insertBoard(
    @Body() registData: BoardRegistVo
    // @UploadedFiles() file?: Express.Multer.File[]
  ) {
    return this.boardService.insertBoard(registData);
    // return this.boardService.insertBoard(registData, file);
  }

  @Patch('/update/:ctgy/:uuid')
  // @UseInterceptors(AnyFilesInterceptor()) -- 첨부파일
  updateBoard(
    @Param('ctgy') ctgy: BaordCategory,
    @Param('uuid') uuid: string,
    @Body() data: BoardUpdateVo
  ) {
    return this.boardService.updateBoard(ctgy, uuid, data);
  }

  @Delete('/remove/:uuid')
  removeBoard(@Param('uuid') uuid: string) {
    return this.boardService.removeBoard(uuid);
  }
}
