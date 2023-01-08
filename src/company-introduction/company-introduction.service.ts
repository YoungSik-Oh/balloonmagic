import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyIntroduction } from 'src/@database/entity/companyIntroduction.entity';
import { Repository } from 'typeorm';
import { CompanyIntroductionRegistVo } from './vo/company-introduction-regist.vo';
import { CompanyIntroductionUpdateVo } from './vo/company-introduction-update.vo';

@Injectable()
export class CompanyIntroductionService {
  private readonly logger = new Logger(CompanyIntroductionService.name);

  constructor(
    @InjectRepository(CompanyIntroduction)
    private companyIntroductionRepository: Repository<CompanyIntroduction>
  ) {}

  async getIntroduction(): Promise<CompanyIntroduction[]> {
    return await this.companyIntroductionRepository.find();
  }

  async insertIntroduction(data: CompanyIntroductionRegistVo): Promise<any> {
    const saveData = await this.companyIntroductionRepository.create({
      main_title: data.main_title,
      sub_title: data.sub_title,
      contents: data.contents,
      registAt: new Date().toJSON(),
    });

    return this.companyIntroductionRepository.save(saveData).catch((error) => {
      this.logger.error(error);
      throw new Error('정상적으로 저장되지 않았습니다.');
    });
  }

  async updateIntroduction(
    uuid: string,
    data: CompanyIntroductionUpdateVo
  ): Promise<CompanyIntroduction> {
    const saveData = await this.companyIntroductionRepository
      .findOneByOrFail({
        uuid,
      })
      .catch((error) => {
        this.logger.error(error);
        throw new NotFoundException(`조회된 소개글이 없습니다.`);
      });
    await this.companyIntroductionRepository.update(saveData.uuid, {
      ...data,
      updateAt: new Date().toJSON(),
    });

    const result = await this.companyIntroductionRepository
      .findOneByOrFail({ uuid })
      .catch(() => {
        throw new NotFoundException(`조회된 소개글이 없습니다.`);
      });
    return result;
  }
}
