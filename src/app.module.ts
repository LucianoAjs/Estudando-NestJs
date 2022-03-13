import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CaregoriasModule } from './caregorias/caregorias.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.kfsun.mongodb.net/smartranking?retryWrites=true&w=majority',
    ),
    JogadoresModule,
    CaregoriasModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
