import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entity/board.entity';
import { CompanyInfo } from './entity/companyInfo.entity';
import { CompanyIntroduction } from './entity/companyIntroduction.entity';
import { Inquire } from './entity/Inquire.entity';
import { MainHistory } from './entity/mainHistory.entity';
import { MainScreen } from './entity/mainscreen.entity';
import { Program } from './entity/program.entity';
import { User } from './entity/user.entity';
import { Visitant } from './entity/visitant.entity';

const modules = [
  TypeOrmModule.forFeature([
    User,
    Board,
    CompanyInfo,
    MainScreen,
    CompanyIntroduction,
    Program,
    Inquire,
    MainHistory,
    Visitant,
  ]),
];

@Module({
  imports: modules,
  exports: modules,
})
export class DatabaseModule {}
