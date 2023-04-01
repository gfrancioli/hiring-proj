import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { readFileSync } from 'fs';
import { remove } from 'fs-extra';
import * as pdfParser from 'pdf-parse';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from '../services/app.service';
import { CatchDataService } from 'src/services/catchData.service';
import { UserModel } from 'src/models/user.model';
import { DynamoService } from 'src/services/dynamo.service';
const FOLDER = 'temp';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly catchData: CatchDataService,
    private readonly dynamo: DynamoService,
  ) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: FOLDER }))
  async get_pdf(@UploadedFile() file: Express.Multer.File): Promise<object> {
    let text, res: UserModel;
    const pdfData = readFileSync(file.path);
    pdfParser(pdfData).then((pdf) => {
      text = pdf.text;
      res = this.catchData.getData(text);
    });
    await remove(file.path);
    await this.dynamo.insertData(res);
    return { message: 'The information has been processed' };
  }
}
