import { PartialType } from '@nestjs/mapped-types';
import { CreateGyerekDto } from './create-gyerek.dto';
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class UpdateGyerekDto extends PartialType(CreateGyerekDto) {
  @IsString()
  @IsNotEmpty()
  nev: string

  @IsString()
  @IsNotEmpty()
  cim: string

  @IsBoolean()
  @IsNotEmpty()
  jovolte: boolean
}
