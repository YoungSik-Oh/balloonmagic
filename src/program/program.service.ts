import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from 'src/@database/entity/program.entity';
import { Repository } from 'typeorm';
import { ProgramRegistVo } from './vo/program.regist.vo';
import { ProgramUpdateVo } from './vo/program.update.vo';

@Injectable()
export class ProgramService {
  private readonly logger = new Logger(ProgramService.name);

  constructor(
    @InjectRepository(Program) private programRepository: Repository<Program>
  ) {}

  async getProgram(
    ctgy: 'extreme' | 'carnival' | 'store'
    // uuid: string
  ): Promise<Program[]> {
    return this.programRepository.find({
      where: {
        category: ctgy,
        // uuid: uuid,
      },
    });
  }

  async insertProgram(data: ProgramRegistVo): Promise<Program> {
    const saveData = await this.programRepository.create({
      category: data.category,
      title: data.title,
      contents: data.contents,
      registAt: new Date().toJSON(),
    });

    return this.programRepository.save(saveData).catch((error) => {
      throw new Error(`저장에 실패했습니다.`);
    });
  }

  async updateProgram(
    ctgy,
    uuid: string,
    data: ProgramUpdateVo
  ): Promise<Program> {
    const savedData = await this.programRepository
      .findOneByOrFail({
        category: ctgy,
        uuid,
      })
      .catch((error) => {
        this.logger.error(error);
        throw new NotFoundException(`조회된 게시글이 없습니다.`);
      });

    await this.programRepository
      .update(savedData.uuid, {
        ...data,
        updateAt: new Date().toJSON(),
      })
      .catch((error) => {
        this.logger.error(error);
        throw new Error('업데이트에 실패했습니다.');
      });

    return this.programRepository.findOneByOrFail({
      category: ctgy,
      uuid,
    });
  }
}
