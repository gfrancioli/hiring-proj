import { IsNotEmpty, IsString } from 'class-validator';

export class UserModel {
  @IsNotEmpty()
  @IsString()
  linkedinUrl!: string;

  @IsNotEmpty()
  @IsString()
  experience!: string;

  @IsNotEmpty()
  @IsString()
  languages!: string;

  @IsNotEmpty()
  @IsString()
  mainSkills!: string;

  @IsNotEmpty()
  @IsString()
  email!: string;
}
