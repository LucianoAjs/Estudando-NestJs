import { Module } from '@nestjs/common';
import { CategoriasService } from './caregorias.service';
import { CaregoriasController } from './caregorias.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaSchema } from './interfaces/caregoria.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Categoria', schema: CategoriaSchema }]),
  ],
  controllers: [CaregoriasController],
  providers: [CategoriasService],
  exports: [CategoriasService],
})
export class CaregoriasModule {}
