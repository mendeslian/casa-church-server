import {
  IsInt,
  IsOptional,
  IsString,
  IsIn,
  Min,
  IsUUID,
  IsDate,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FindEventsQueryDto {
  @ApiPropertyOptional({
    example: 1,
    description: "Número da página para paginação (valor padrão: 1)",
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "O parâmetro página deve ser um inteiro" })
  @Min(1, { message: "O parâmetro página deve ser no mínimo 1" })
  page: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: "Quantidade máxima de registros por página (valor padrão: 10)",
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "O parâmetro limite deve ser um inteiro" })
  @Min(1, { message: "O parâmetro limite deve ser no mínimo 1" })
  limit: number = 10;

  @ApiPropertyOptional({
    example: "Encontro da Casa Church",
    description: "Filtra eventos pelo título",
  })
  @IsOptional()
  @IsString({ message: "O parâmetro título deve ser um texto" })
  title?: string;

  @ApiPropertyOptional({
    example: "2025-11-20T18:00:00.000Z",
    description: "Filtra eventos pela data de início",
    type: String,
    format: "date-time",
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: "O parâmetro data de início deve ser uma data válida" })
  startDate?: Date;

  @ApiPropertyOptional({
    example: "2025-11-20T20:00:00.000Z",
    description: "Filtra eventos pela data de término",
    type: String,
    format: "date-time",
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: "O parâmetro data de término deve ser uma data válida" })
  endDate?: Date;

  @ApiPropertyOptional({
    example: "e66a6ecf-e6c0-4df7-b2a2-58a029017529",
    description: "Filtra eventos pelo ID do usuário que criou",
  })
  @IsOptional()
  @IsUUID(4, { message: "O parâmetro autor deve ser um tipo válido" })
  createdBy?: string;

  @ApiPropertyOptional({
    example: "createdAt",
    description:
      "Campo usado para ordenar os resultados (valor padrão: createdAt)",
  })
  @IsOptional()
  @IsString({ message: "O parâmetro ordenar deve ser um texto" })
  orderBy: string = "createdAt";

  @ApiPropertyOptional({
    example: "DESC",
    description: "Direção da ordenação: ASC ou DESC (valor padrão: DESC)",
    enum: ["ASC", "DESC"],
  })
  @IsOptional()
  @IsIn(["ASC", "DESC"], {
    message: "O parâmetro direção deve ser ASC ou DESC",
  })
  orderDirection: "ASC" | "DESC" = "DESC";
}
