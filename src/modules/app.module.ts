import { Module } from '@nestjs/common';
import { Axios } from 'axios';
import { CatchDataService } from 'src/services/catchData.service';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { DynamoModule } from './dynamo.module';
import { Cheerio } from 'cheerio';

@Module({
  imports: [DynamoModule],
  controllers: [AppController],
  providers: [AppService, CatchDataService, DynamoModule, Axios],
})
export class AppModule {}
