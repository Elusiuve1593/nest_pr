import { IsString } from 'class-validator';

export class TagDto {
  @IsString()
  readonly name: string;
}
