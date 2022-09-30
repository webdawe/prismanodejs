import { IsString, Length, MinLength,IsNotEmpty, IsNumber } from 'class-validator'
import { Trim } from 'class-sanitizer'

export class CreateBookDto {
  @IsString()
  @Trim()
  @IsNotEmpty()
  public title?: string;

  @IsString()
  @Trim()
  @IsNotEmpty()
  public type?: string;

  @IsNumber()
  @IsNotEmpty()
  public authorId?: number;
}
