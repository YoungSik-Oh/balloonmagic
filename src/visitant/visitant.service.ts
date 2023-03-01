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

    const thisWeekDays = await this.visitantRepository.query(`
        SELECT
          ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 1 ) AS MONDAY,
          ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 2 ) AS TUESDAY,
          ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 3 ) AS WEDNESDAY,
          ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 4 ) AS THURSDAY,
          ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 5 ) AS FRIDAY,
          ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 6 ) AS SATURDAY,
          ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 7 ) AS SUNDAY
        FROM
          DUAL
    `);

    const weekDayArr: any = Object.values(thisWeekDays[0]).map((day: any) => ({
      VISIT_DAY: day.toISOString().substring(0, 10),
    }));

    const inquireArr: any = Object.values(thisWeekDays[0]).map((day: any) => ({
      date: day.toISOString().substring(0, 10),
    }));

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
          AND (SELECT ADDDATE(CURDATE(),-WEEKDAY(CURDATE())+6))
    `);

    for (let i = 0; i < weekDayArr.length; i++) {
      for (let j = 0; j < weekDayVisitant.length; j++) {
        if (weekDayArr[i].VISIT_DAY === weekDayVisitant[j].VISIT_DAY) {
          weekDayArr[i].COUNT = weekDayVisitant[j].COUNT;
          break;
        }
        if (j === weekDayVisitant.length - 1) {
          weekDayArr[i].COUNT = '0';
        }
      }
    }

    const thisWeekVisitantCount = await this.visitantRepository.query(`
        SELECT SUM(COUNT) as weekCount
        FROM VISITANT 
        WHERE date_format(VISIT_DAY , '%Y-%m-%d') 
        BETWEEN (SELECT ADDDATE(CURDATE(),-WEEKDAY(CURDATE())+0)) 
        AND (SELECT ADDDATE(CURDATE(),-WEEKDAY(CURDATE())+6))
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
            AND (SELECT ADDDATE(CURDATE(),-WEEKDAY(CURDATE())+6))
          GROUP BY date
          ORDER BY date ASC
      `
    );

    for (let i = 0; i < inquireArr.length; i++) {
      for (let j = 0; j < weekInquire.length; j++) {
        if (inquireArr[i].date === weekInquire[j].date) {
          inquireArr[i].count = weekInquire[j].count;
          break;
        }
        if (j === weekInquire.length - 1) {
          inquireArr[i].count = '0';
        }
      }
    }

    console.log('inquireArr', inquireArr);

    // 금주 문의 사항 등록 count
    let weekInquireCount: number = 0;

    weekInquire.map((payload, idx) => {
      if (payload.count) {
        weekInquireCount = weekInquireCount + +payload.count;
      }
    });

    return {
      todayVisitant: todayVisitant.length === 0 ? 0 : todayVisitant[0].COUNT,
      weekDayVisitant: weekDayArr,
      WeekVisitantCount: +thisWeekVisitantCount[0].weekCount,
      todayInquire:
        todayInquire.length === 0 ? 0 : todayInquire[0].todayInquireCount,
      weekInquire: inquireArr,
      weekInquireCount: weekInquireCount,
    };
  }
}
