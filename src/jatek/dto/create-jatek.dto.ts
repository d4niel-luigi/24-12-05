import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateJatekDto {
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
