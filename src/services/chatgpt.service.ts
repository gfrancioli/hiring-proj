import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';
import { UserModel, UserModelGPT } from 'src/models/user.model';

@Injectable()
export class ChatGPTService {
  private openai: OpenAIApi;
  private readonly modelId: string;

  constructor() {
    const configuration = new Configuration({
      apiKey: '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',
      organization: 'org-UMNFIfdtDx43VhTgDu5fJuw4',
    });
    this.openai = new OpenAIApi(configuration);
  }

  async getModelAnswer(question: string) {
    try {
      const params: CreateCompletionRequest = {
        prompt: question,
        model: 'text-davinci-003',
        temperature: 0.9,
        max_tokens: 2000,
      };
      const response = await this.openai.createCompletion(params);
      const { data } = response;
      if (data.choices.length) return data.choices;
      return response.data;
    } catch (error) {
      console.log(error.data);
    }
  }

  async getResponse(question: string): Promise<UserModelGPT> {
    try {
      const res = await this.getModelAnswer(
        'get top skills, experience, contact(email and linkedin) and degree(field and school) information on this text and transform to json with all keys lowercase and with this schema:' +
          '{contact: {email: string, linkedin: string}, experience: [{company: string, role: string, durantion: string}], education: [{degree: string, school: string}], skills: []}' +
          question +
          '\n ###',
      );
      const regex = /^[^{]*/;
      const match = res[0].text.replace(regex, '');
      // console.log(match);
      const document = JSON.parse(JSON.parse(JSON.stringify(match).trim()));
      const data: UserModelGPT = {
        linkedinUrl: document['contact']?.linkedin
          ? document['contact'].linkedin
          : '',
        experience: document['experience']?.map((item) => {
          return {
            company: item.company,
            role: item.role,
            duration: item.duration,
          };
        }),
        contact: { email: document['contact']?.email },
        mainSkills: document['skills'] ? [...document['skills']] : [],
        education: document['education']?.map((item) => {
          return {
            degree: item.degree,
            school: item.school,
          };
        }),
      };
      return data;
    } catch (error) {
      throw new HttpException(
        'Error retrieving data from pdf',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
