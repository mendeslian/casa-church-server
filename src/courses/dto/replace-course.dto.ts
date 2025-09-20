import { IsOptional, IsString, IsInt, Min, IsBoolean } from "class-validator";

export class UpdateCourseDto {
  @IsString({ message: "O campo nome precisa ser do tipo texto" })
  name?: string;

  @IsString({ message: "O campo descrição precisa ser do tipo texto" })
  description?: string;

  @IsInt({ message: "A duração do curso deve ser um número inteiro" })
  @Min(1, { message: "A duração do curso deve ser maior que zero" })
  duration_hours?: number;

  @IsBoolean({ message: "O campo ativado/desativo é do tipo boolean" })
  active?: boolean;
}
