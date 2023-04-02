import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { UserModel } from '../models/user.model';

const dynamo = new DynamoDB.DocumentClient({ region: 'us-east-1' });
const TABLENAME = 'hiring';
@Injectable()
export class DynamoService {
  async insertData(user: UserModel): Promise<void> {
    await dynamo.put({ TableName: TABLENAME, Item: user }).promise();
  }

  async getBySkills(skill: string): Promise<DynamoDB.ScanOutput> {
    const params = {
      TableName: TABLENAME,
      FilterExpression: 'contains (mainSkills, :skill)',
      ExpressionAttributeValues: {
        ':skill': skill.toLowerCase(),
      },
    };
    return await dynamo.scan(params).promise();
  }
}
