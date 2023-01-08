import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './@database/database.config';
import { DatabaseModule } from './@database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { CompanyinfoModule } from './companyinfo/companyinfo.module';
import { MainscreenModule } from './mainscreen/mainscreen.module';
import { CompanyIntroductionModule } from './company-introduction/company-introduction.module';
import { ProgramModule } from './program/program.module';
import { InquireModule } from './inquire/inquire.module';
import { MainhistoryModule } from './mainhistory/mainhistory.module';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    DatabaseModule,
    UserModule,
    BoardModule,
    CompanyinfoModule,
    MainscreenModule,
    CompanyIntroductionModule,
    ProgramModule,
    InquireModule,
    MainhistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
