import { Injectable } from '@nestjs/common';

@Injectable()
export class CatchDataService {
  getData(data: string[][]): any {
    const email = this.getEmail(data[0]);
    console.log(email);
  }

  getEmail(data: string[]): any {}
}
