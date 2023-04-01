import { Module } from '@nestjs/common';
import { CatchDataService } from 'src/services/catchData.service';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { DynamoModule } from './dynamo.module';

@Module({
  imports: [DynamoModule],
  controllers: [AppController],
  providers: [AppService, CatchDataService, DynamoModule],
})
export class AppModule {}
