import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Visitant } from 'src/@database/entity/visitant.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class VisitantService {
  private readonly logger = new Logger(VisitantService.name);

  constructor(
    @InjectRepository(Visitant)
    private visitantRepository: Repository<Visitant>,
    @InjectConnection() private readonly connection: Connection
  ) {}

  async getVisit(): Promise<Visitant[]> {
    return this.visitantRepository.find();
  }

  async addVisitCount(flag: number, date: string): Promise<Visitant> {
    const existData = await this.visitantRepository
      .findOneOrFail({
        where: {
          visit_day: date,
        },
      })
      .catch(async (error) => {
        // 해당 날짜가 없으면 해당날짜 넣어주기
        if (flag === 1) {
          await this.visitantRepository.save({
            visit_day: date,
            count: +1,
          });
        }
      });
    if (flag === 1 && existData) {
      await this.visitantRepository.update(existData.visit_day, {
        count: +existData.count + 1,
      });
    }
    return this.visitantRepository.findOneOrFail({
      where: {
        visit_day: date,
      },
    });
  }

  async getDashBoardData() {
    const curDate = new Date(+new Date() + 3240 * 10000)
      .toISOString()
      .split('T')[0];
    const todayVisitant = await this.visitantRepository.query(`
            SELECT COUNT
            FROM VISITANT 
            WHERE VISIT_DAY = '${curDate}'
      `);

    const weekDayVisitant = await this.visitantRepository.query(`
        SELECT * 
        FROM VISITANT 
        WHERE date_format(VISIT_DAY , '%Y-%m-%d') 
        BETWEEN (SELECT ADDDATE(CURDATE(),-WEEKDAY(CURDATE())+0)) 
          AND (SELECT ADDDATE(CURDATE(),-WEEKDAY(CURDATE())+7))
    
    `);

    const todayInquire = await this.connection.query(
      `
        SELECT count(*) as todayInquireCount
        FROM INQUIRE
        WHERE REGIST_AT LIKE '${curDate}%'
        `
    );

    const weekInquire = await this.connection.query(
      `
          SELECT DISTINCT (date_format(REGIST_AT,'%Y-%m-%d')) as date , count(REGIST_AT) as count
          FROM INQUIRE 
          WHERE date_format(REGIST_AT , '%Y-%m-%d') 
          BETWEEN (SELECT ADDDATE(CURDATE(),-WEEKDAY(CURDATE())+0)) 
            AND (SELECT ADDDATE(CURDATE(),-WEEKDAY(CURDATE())+7))
          GROUP BY date
        `
    );

    return {
      todayVisitant: todayVisitant.length === 0 ? 0 : todayVisitant[0].COUNT,
      weekDayVisitant: weekDayVisitant,
      todayInquire:
        todayInquire.length === 0 ? 0 : todayInquire[0].todayInquireCount,
      weekInquire: weekInquire,
    };
  }
}
