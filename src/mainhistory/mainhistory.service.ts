import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MainHistory } from 'src/@database/entity/mainHistory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MainhistoryService {
  private readonly logger = new Logger(MainhistoryService.name);

  constructor(
    @InjectRepository(MainHistory)
    private mainHistoryRepository: Repository<MainHistory>
  ) {}

  async getMainHistory(): Promise<MainHistory[]> {
    return this.mainHistoryRepository.find();
  }

  async insertMinHistory(city: string, location: string): Promise<MainHistory> {
    const savedData = await this.mainHistoryRepository.findOne({
      where: {
        city: city,
      },
    });

    if (savedData) {
      throw new BadRequestException('이미 존재하는 지역입니다.');
    }

    const data = await this.mainHistoryRepository.create({
      city: city,
      location: location,
    });
    return await this.mainHistoryRepository.save(data);
  }

  async updateMainHistory(city: string, data): Promise<MainHistory> {
    const savedData = await this.mainHistoryRepository
      .findOneByOrFail({
        city: city,
      })
      .catch((error) => {
        throw new NotFoundException(`해당 지역은 존재하지 않습니다.`);
      });

    if (savedData) {
      await this.mainHistoryRepository.update(savedData.city, {
        location: data,
      });
    }

    return this.mainHistoryRepository.findOneByOrFail({
      city: city,
    });
  }
}
