import { Module } from '@nestjs/common';
import { CatchDataService } from 'src/services/catchData.service';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CatchDataService],
})
export class AppModule {}
