import { Module } from '@nestjs/common';
import { ProdukService } from './produk.service';
import { ProdukController } from './produk.controller';
import { Produk } from './produk.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Produk])],
  providers: [ProdukService],
  controllers: [ProdukController]
})
export class ProdukModule { }
