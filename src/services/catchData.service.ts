import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class CatchDataService {
  getData(data: string): UserModel {
    const skills = this.getSkills(data);
    const contact = this.getContact(data);
    const linkedinUrl = this.getLinkedinUrl(data);
    const experience = this.getExperiences(data);
    const education = this.getEducation(data);

    const newData: UserModel = {
      linkedinUrl,
      mainSkills: skills,
      contact,
      experience,
      education,
    };

    return newData;
  }

  getContact(data: string): string[] {
    const regex = /Contact\n([\s\S]*?)www.linkedin.com/m;
    const res = this.matchRegex(regex, data);
    return res;
  }

  getLinkedinUrl(data: string): string {
    const regex = /www.linkedin.com([\s\S]*?)\(LinkedIn\)/i;
    const match = data.match(regex);
    let res: string;
    if (match)
      res = match[0].replace('\n', '').replace('(LinkedIn)', '').trim();
    return res;
  }

  getSkills(data: string): string[] {
    const regex = /Top Skills\n([\s\S]*?)\n(?:\n|$){3}/m;
    const res = this.matchRegex(regex, data).slice(0, 3);
    const resLower = res.map((item) => item.toLowerCase());
    return resLower;
  }

  getExperiences(data: string): string {
    const regex = /Experience\n([\s\S]*?)Education/m;
    const res = this.matchRegex(regex, data);
    const filteredArray = res.filter((element) => {
      return (
        element !== '' &&
        element.trim() !== '' &&
        element !== ',' &&
        !element.includes('Page ')
      );
    });
    return filteredArray.join('\n');
  }

  getEducation(data: string): string {
    const regex = /Education\s+([\s\S]*?)Page/;
    const res = this.matchRegex(regex, data);
    return res.join('\n');
  }

  matchRegex(regex: RegExp, text: string): string[] {
    const match = text.match(regex);
    let data: string[];
    if (match) data = match[1].trim().split('\n');
    return data;
  }
}
