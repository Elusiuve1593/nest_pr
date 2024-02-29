import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class UserDto {
  @IsString()
  userName?: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(7)
  password: string;
}

export class CreateUserDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  user: UserDto[];

  //@IsString()
  access_token: string
}
