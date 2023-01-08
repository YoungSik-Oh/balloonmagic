import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/@database/database.module';
import { MainscreenController } from './mainscreen.controller';
import { MainscreenService } from './mainscreen.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MainscreenController],
  providers: [MainscreenService],
})
export class MainscreenModule {}
