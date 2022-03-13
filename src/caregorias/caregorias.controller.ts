import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriasService } from './caregorias.service';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

import { ICategoria } from './interfaces/categoria.interface';

@Controller('api/v1/caregorias')
export class CaregoriasController {
  constructor(private readonly caregoriasService: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarCategoria(
    @Body() criarCategoriaDto: CriarCategoriaDto,
  ): Promise<ICategoria> {
    return await this.caregoriasService.criarCategoria(criarCategoriaDto);
  }
}
