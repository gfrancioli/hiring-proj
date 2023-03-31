import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from '../services/app.service';
import { PDFExtract, PDFExtractOptions } from 'pdf.js-extract';
import { LinkedInProfileScraper } from 'linkedin-profile-scraper';

import * as linke from 'linkedin-public-profile-parser';
import { CatchDataService } from 'src/services/catchData.service';

const scraper = new LinkedInProfileScraper({
  sessionCookieValue: 'LI_AT_COOKIE_VALUE',
  keepAlive: false,
});
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly catchData: CatchDataService,
  ) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: 'test' }))
  async get_pdf(@UploadedFile() file: Express.Multer.File): Promise<any> {
    await scraper.setup();
    const result = await scraper.run(
      'https://www.linkedin.com/in/jvandenaardweg/',
    );
    console.log(result)

    // const pdfExtract = new PDFExtract();
    // const pdf = await pdfExtract.extract(file.path);
    // const content = pdf.pages.map((item) => {
    //   return item.content.map((text) => {
    //     return text.str;
    //   });
    // });
    // console.log(content);
    // this.catchData.getData(content);
  }
}
