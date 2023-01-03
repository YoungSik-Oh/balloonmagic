import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MainScreen } from 'src/@database/entity/mainscreen.entity';
import { Repository } from 'typeorm';
import { MainScreenRegistVo } from './vo/mainscreen-regist.vo';
import { MainScreenUpdateVo } from './vo/mainscreen-update.vo';

@Injectable()
export class MainscreenService {
  private readonly logger = new Logger(MainscreenService.name);

  constructor(
    @InjectRepository(MainScreen)
    private mainScreenRepository: Repository<MainScreen>
  ) {}

  async getMainScreen(): Promise<MainScreen[]> {
    return this.mainScreenRepository.find();
  }

  async insertMainScreen(data: MainScreenRegistVo): Promise<MainScreen> {
    const saveData: MainScreen = await this.mainScreenRepository.create({
      sign_post: data.sign_post,
      youtube: data.youtube,
      instargram: data.instargram,
      facebook: data.facebook,
    });

    return this.mainScreenRepository.save(saveData);
  }

  async updateMainScreen(
    uuid: string,
    data: MainScreenUpdateVo
  ): Promise<MainScreen> {
    const savedData = await this.mainScreenRepository
      .findOneByOrFail({
        uuid: uuid,
      })
      .catch(() => {
        throw new NotFoundException(`조회된 글이 없습니다.`);
      });

    await this.mainScreenRepository
      .update(savedData.uuid, {
        ...data,
      })
      .catch((error) => {
        throw new Error(`업데이트에 실패했습니다. ${error} `);
      });

    const result = await this.mainScreenRepository
      .findOneByOrFail({
        uuid: uuid,
      })
      .catch(() => {
        throw new NotFoundException(`조;회된 글이 없습니다.`);
      });

    return result;
  }
}
