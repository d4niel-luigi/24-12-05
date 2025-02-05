import { IsBoolean, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty  } from "@nestjs/swagger";

export class CreateGyerekDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @ApiProperty({
    example: 'Piroska'
  })
  nev: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Magyarország, Budapest, Farkas utca 14.'
  })
  cim: string

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: true
  })
  jovolte: boolean
}

