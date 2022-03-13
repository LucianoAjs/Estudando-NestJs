import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarjogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { IJogador } from './interfaces/jogador.interface';
import { JogadoresValidacaoParametrosPipes } from './pipes/jogadores-validacao-parametros.pipe';
import { AtualizarjogadorDto } from './dtos/atualizar-jogador.dto copy';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(
    @Body() criarjogadorDto: CriarjogadorDto,
  ): Promise<IJogador> {
    return await this.jogadoresService.criarJogador(criarjogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizarJogadorDto: AtualizarjogadorDto,
    @Param('_id', JogadoresValidacaoParametrosPipes) _id: string,
  ) {
    await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto);
  }

  @Get()
  async consultarJogadores(): Promise<IJogador[]> {
    return this.jogadoresService.consultarTodosJogadores();
  }

  @Get('/:_id')
  async consultarJogadorPeloId(
    @Param('_id', JogadoresValidacaoParametrosPipes) _id: string,
  ): Promise<IJogador> {
    return this.jogadoresService.consultarJogadorPeloId(_id);
  }

  @Delete('/:_id')
  async deletarJogador(
    @Param('_id', JogadoresValidacaoParametrosPipes) _id: string,
  ): Promise<void> {
    this.jogadoresService.deletarJogadorPeloId(_id);
  }
}
