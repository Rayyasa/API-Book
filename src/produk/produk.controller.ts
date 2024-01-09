import { Controller, Body, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { ProdukService } from './produk.service';
import { createProductArrayDto, createProductDto, DeleteProductArrayDto, FindProductDto, UpdateProductDto } from './produk.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { FindBookDto } from 'src/book/book.dto';
@Controller('produk')
export class ProdukController {
  constructor(private produkservice: ProdukService) { }


  @Get('/list')
  findAllProduk(@Pagination() findprodukdto: FindProductDto) {
    console.log(findprodukdto);
    return this.produkservice.getAllProduk(findprodukdto);
  }
  @Get('detail/:id')
  async findOneBook(@Param('id') id: string) {
    return this.produkservice.getDetail(Number(id));
  }
  @Post('/create')
  @UsePipes(ValidationPipe)
  createProduk(@Body() payload: createProductDto) {
    return this.produkservice.createProduk(payload)
  }

  @Put('update/:id')
  updateProduk(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    return this.produkservice.updateProduct(Number(id), payload)
  }
  @Delete('delete/:id')
  deleteProduk(@Param('id') id: string) {
    return this.produkservice.deleteProduk(+id);
  }

  @Post('/create/bulk')
  bulkCreateProduk(@Body() payload: createProductArrayDto) {
    return this.produkservice.bulkCreate(payload);
  }
  @Post('/delete/bulk')
  bulkDeleteProduk(@Body() payload: DeleteProductArrayDto) {
    return this.produkservice.bulkDelete(payload);
  }
}
