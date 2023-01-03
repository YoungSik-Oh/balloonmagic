import {
  Injectable,
  Logger,
  NotFoundException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Board, BaordCategory } from 'src/@database/entity/board.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { BoardRegistVo } from './vo/board-regist.vo';
import { BoardUpdateVo } from './vo/board-update.vo';

@Injectable()
export class BoardService {
  private readonly logger = new Logger(BoardService.name);

  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>
  ) {}

  async getAllBoard(
    pagination: IPaginationOptions,
    ctgy: BaordCategory
  ): Promise<Pagination<Board>> {
    return paginate<Board>(this.boardRepository, pagination, {
      where: {
        category: ctgy,
      },
    });
  }

  async findBoard(
    pagination: IPaginationOptions,
    conditions: { title: string; contents: string }
  ): Promise<Pagination<Board>> {
    const { title, contents } = conditions;
    console.log(' service title ~ ', title);
    console.log(' service contents ~ ', contents);

    const query: SelectQueryBuilder<Board> =
      this.boardRepository.createQueryBuilder('board');

    if (title) {
      query.where('board.title like :title', { title: `%${title}%` });
    }
    if (contents) {
      query.where('board.contents like :contents', {
        contents: `%${contents}%`,
      });
    }

    console.log(' query ', query);
    return paginate<Board>(query, pagination);
  }

  // 조회수 증가
  async hitadd(uuid: string): Promise<Board> {
    const bId = await this.boardRepository
      .findOneByOrFail({ uuid })
      .catch(() => {
        throw new NotFoundException(`조회된 게시글이 없습니다.`);
      });
    return this.boardRepository.save({ ...bId, hit: +bId.hit + 1 });
  }

  async findOneBoard(uuid: string, ctgy: BaordCategory): Promise<Board> {
    await this.hitadd(uuid);
    return this.boardRepository.findOneByOrFail({ uuid }).catch(() => {
      throw new NotFoundException(`조회된 게시글이 없습니다. id: ${uuid}`);
    });
  }

  async insertBoard(
    registData: BoardRegistVo
    // files: Express.Multer.File[]
  ): Promise<any> {
    const { category, contents, title, writerID } = registData;

    let orginName = '';

    // files?.forEach((file) => {
    //   const {
    //     fieldname, // 'imageMain',
    //     originalname, // 'photo.png',
    //     // encoding, // '7bit',
    //     mimetype, // 'image/png',
    //     // destination, // 'public',
    //     filename, // '1f5b3d6f-cfcb-4378-9d50-fa56421208ae.png',
    //     // path, // 'public/1f5b3d6f-cfcb-4378-9d50-fa56421208ae.png',
    //     // size, // 3044
    //   } = file;
    //   // const [filetype] = mimetype.split('/')
    //   orginName = originalname;
    // });

    const saveData = this.boardRepository.create({
      category: category,
      contents: contents,
      title: title,
      registAt: new Date().toJSON(),
      writer: writerID,
      hit: 0,
      // file: orginName,
      // file_registAt: new Date().toJSON(),
    });

    return this.boardRepository.save(saveData);
  }

  async updateBoard(
    ctgy: BaordCategory,
    uuid: string,
    data: BoardUpdateVo
  ): Promise<Board> {
    const savedBoard = await this.boardRepository
      .findOneByOrFail({ category: ctgy, uuid })
      .catch(() => {
        throw new NotFoundException(`조회된 게시글이 없습니다.`);
      });

    await this.boardRepository.update(savedBoard.uuid, {
      ...data,
      updateAt: new Date().toJSON(),
    });

    const result = await this.boardRepository
      .findOneByOrFail({ category: ctgy, uuid: savedBoard.uuid })
      .catch(() => {
        throw new NotFoundException(`조회된 게시글이 없습니다.`);
      });

    return result;
  }

  async removeBoard(uuid: string): Promise<Board> {
    let result;
    const savedBoard = await this.boardRepository
      .findOneByOrFail({ uuid })
      .catch(() => {
        throw new NotFoundException(`조회된 게시글이 없습니다.`);
      });

    const success = await this.boardRepository.remove(savedBoard);

    if (success) {
      result = {
        code: '200',
        message: '게시글이 성공적으로 삭제 되었습니다.',
      };
    } else {
      result = {
        code: '500',
        message: '삭제에 실패하였습니다.',
      };
      this.logger.error(' remove fail ', success);
    }

    return result;
  }
}
