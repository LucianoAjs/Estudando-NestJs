import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CriarjogadorDto } from './dtos/criar-jogador.dto';
import { IJogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarjogadorDto } from './dtos/atualizar-jogador.dto copy';
@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<IJogador>,
  ) {}

  private readonly logger = new Logger(JogadoresService.name);
  public async criarJogador(
    criarjogadorDto: CriarjogadorDto,
  ): Promise<IJogador> {
    const { email } = criarjogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(
        `Jogador com e-mail ${email} já cadastrado`,
      );
    }
    const jogadorCriado = new this.jogadorModel(criarjogadorDto);
    return await jogadorCriado.save();
  }

  public async atualizarJogador(
    _id: string,
    atualizarJogadorDto: AtualizarjogadorDto,
  ): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }

    await this.jogadorModel
      .findOneAndUpdate({ _id }, { $set: atualizarJogadorDto })
      .exec();
  }

  public async consultarTodosJogadores(): Promise<IJogador[]> {
    return await this.jogadorModel.find().exec();
  }

  public async consultarJogadorPeloId(_id: string): Promise<IJogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id: ${_id} não encontrado`);
    }
    return jogadorEncontrado;
  }

  public async deletarJogadorPeloId(_id: string): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id: ${_id} não encontrado`);
    }
    await this.jogadorModel.deleteOne({ _id }).exec();
  }
}
