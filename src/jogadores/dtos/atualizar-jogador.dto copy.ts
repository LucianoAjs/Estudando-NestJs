import { IsNotEmpty } from 'class-validator';

export class AtualizarjogadorDto {
  @IsNotEmpty()
  readonly telefoneCelular: string;

  @IsNotEmpty()
  readonly nome: string;
}
