import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CreateLessonDto {
  @IsNotEmpty({ message: "O título não pode estar vazio" })
  @IsString({ message: "O título não está no formato adequado" })
  declare title: string;

  @IsString({ message: "A descrição não está no formato adequado" })
  declare description: string;

  @IsNotEmpty({ message: "O sermão não pode estar vazio" })
  @IsString({ message: "O sermão não está no formato adequado" })
  declare sermonId: string;

  @IsOptional()
  @IsString({ message: "O link do video não está no formato adequado" })
  declare videoLink: string;

  @IsNumber({}, { message: "A ordem não está no formato adequado" })
  declare ordem: number;
}
