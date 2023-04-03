import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { readFileSync } from 'fs';
import { remove } from 'fs-extra';
import * as pdfParser from 'pdf-parse';
import { FileInterceptor } from '@nestjs/platform-express';
import { CatchDataService } from 'src/services/catchData.service';
import { DynamoService } from 'src/services/dynamo.service';
import { ApiBody, ApiConsumes, ApiQuery } from '@nestjs/swagger';
const FOLDER = 'temp';

@Controller()
export class AppController {
  constructor(
    private readonly catchData: CatchDataService,
    private readonly dynamo: DynamoService,
  ) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
    required: true,
  })
  @UseInterceptors(FileInterceptor('file', { dest: FOLDER }))
  async getPdf(@UploadedFile() file: Express.Multer.File): Promise<object> {
    if (!file)
      throw new HttpException('File not inserted', HttpStatus.BAD_REQUEST);
    const pdfData = readFileSync(file.path);
    const pdf = await pdfParser(pdfData);
    const text = pdf.text;
    await remove(file.path);
    const res = await this.catchData.getData(text);
    await this.dynamo.insertData(res);
    return { message: 'The information has been processed' };
  }

  @ApiQuery({
    name: 'skill',
    required: true,
  })
  @Get('skills')
  async getSkill(@Query() data: { skill: string }): Promise<any> {
    return await this.dynamo.getBySkills(data.skill);
  }

  @ApiQuery({
    name: 'profile',
    required: true,
  })
  @Get('profile')
  async getByUrl(@Query() data: { profile: string }): Promise<any> {
    return await this.dynamo.getByProfileUrl(data.profile);
  }

  @ApiQuery({
    name: 'word',
    required: true,
  })
  @Get('all')
  async getByAllFields(@Query() data: { word: string }): Promise<any> {
    return await this.dynamo.getByAllFields(data.word);
  }
}
