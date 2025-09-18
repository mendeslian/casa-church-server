import { IsUUID } from 'class-validator';

export class IdParamDto {
  @IsUUID('4', { message: 'ID inválido' })
  id: string;
}
