import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsEmail({}, { message: 'O email deve ser válido' })
  email: string;

  @IsString({ message: 'A matrícula é obrigatória' })
  registration: string;
}
