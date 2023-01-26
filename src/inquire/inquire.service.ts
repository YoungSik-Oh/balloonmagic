import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inquire } from 'src/@database/entity/Inquire.entity';
import { Repository } from 'typeorm';
import { InquireRegistVo } from './vo/inquire.regist.vo';
import { InquireUpdateVo } from './vo/inquire.update.vo';

@Injectable()
export class InquireService {
  private readonly logger = new Logger(InquireService.name);

  constructor(
    @InjectRepository(Inquire) private inquireRepository: Repository<Inquire>
  ) {}

  async getEmail(): Promise<Inquire[]> {
    return this.inquireRepository.find();
  }

  async insertEmail(data: InquireRegistVo): Promise<Inquire> {
    const saveData = await this.inquireRepository.create({
      email: data.email,
      // registAt:new Date(+new Date() + 3240 * 10000),
    });

    return this.inquireRepository.save(saveData);
  }

  async updateEmail(uuid: string, data: InquireUpdateVo): Promise<Inquire> {
    const savedDtata = await this.inquireRepository
      .findOneByOrFail({
        uuid,
      })
      .catch((error) => {
        this.logger.error(error);
        throw new NotFoundException(`등록된 이메일이 없습니다.`);
      });

    if (savedDtata) {
      await this.inquireRepository.update(savedDtata.uuid, {
        ...data,
        updateAt: new Date(),
      });
    }

    return this.inquireRepository.findOneByOrFail({
      uuid,
    });
  }
}
