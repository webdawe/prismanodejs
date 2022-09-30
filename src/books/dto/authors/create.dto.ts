import { IsString, Length, MinLength,IsNotEmpty } from 'class-validator'
import { Trim } from 'class-sanitizer'

export class CreateAuthorDto {
  @IsString()
  @Trim()
  @IsNotEmpty()
  public name?: string;
}
