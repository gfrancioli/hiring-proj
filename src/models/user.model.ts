import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UserModel {
  @IsNotEmpty()
  @IsString()
  linkedinUrl!: string;

  @IsNotEmpty()
  @IsString()
  experience!: string;

  @IsNotEmpty()
  @IsString()
  education!: string;

  @IsNotEmpty()
  @IsArray()
  mainSkills!: string[];

  @IsNotEmpty()
  @IsArray()
  contact!: string[];
}

export class UserModelGPT {
  @IsNotEmpty()
  @IsString()
  linkedinUrl!: string;

  @IsNotEmpty()
  @IsString()
  experience!: object[];

  @IsNotEmpty()
  @IsString()
  education!: object[];

  @IsNotEmpty()
  @IsArray()
  mainSkills!: string[];

  @IsNotEmpty()
  @IsArray()
  contact!: object;
}
