import { IsNotEmpty, IsUUID, IsString, MaxLength } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty({ message: "O usuário da postagem não pode ser vazio" })
  @IsUUID()
  userId: string;

  @IsNotEmpty({ message: "O conteúdo da postagem não pode ser vazio" })
  @IsString({
    message: "O conteúdo da postagem deve ser um texto",
  })
  @MaxLength(625, {
    message: "O conteúdo da postagem possui o tamanho máximo de 625 caracteres",
  })
  content: string;
}
