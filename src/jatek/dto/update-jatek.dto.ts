import { PartialType } from '@nestjs/mapped-types';
import { CreateJatekDto } from './create-jatek.dto';
import { IsInt,IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class UpdateJatekDto extends PartialType(CreateJatekDto) {
  @IsString()
  @IsNotEmpty()
  megnevezes: string

  @IsString()
  @IsNotEmpty()
  anyag: string

  @IsInt()
  @IsNotEmpty()
  suly: number
}
