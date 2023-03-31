import { Module } from '@nestjs/common';
import { DynamoService } from '../services/dynamo.service';

@Module({
  imports: [],
  controllers: [],
  providers: [DynamoService],
})
export class DynamoModule {}
