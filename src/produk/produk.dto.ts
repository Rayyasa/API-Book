import { OmitType, PartialType, PickType } from "@nestjs/mapped-types";
import { IsInt, IsNotEmpty, Min, Max, Length, IsArray, ValidateNested, ArrayNotEmpty, IsOptional, isInt, IsIn, IsEnum } from "class-validator";
import { Type } from 'class-transformer';
import { PageRequestDto } from "src/utils/dto/page.dto";
import { KategoriProduk } from "./produk.entity";
export class ProdukDto {
  id: number;

  @IsNotEmpty()
  @Length(5)
  nama_produk: string;

  @IsNotEmpty()
  @IsEnum(KategoriProduk)
  kategori_produk: KategoriProduk;

  @IsInt()
  @IsNotEmpty()
  @Min(10000)
  harga_produk: number

  @IsInt()
  @IsNotEmpty()
  @Min(10)
  jumlah_produk: number

  @IsNotEmpty()
  deskripsi_produk: string

  @IsNotEmpty()
  @IsInt()
  @Max(2023)
  @Min(2010)
  tahun_pembuatan: number
}

export class createProductDto extends OmitType(ProdukDto, ["id"]) { }
export class UpdateProductDto extends OmitType(ProdukDto, ['id']) { }

export class createProductArrayDto {
  @ValidateNested({ each: true })
  @Type(() => createProductDto)
  @IsArray()
  data: createProductDto[];
}
export class DeleteProductArrayDto {
  @IsArray()
  @ArrayNotEmpty()
  data: number[];
}
export class FindProductDto extends PageRequestDto {
  @IsOptional()
  nama_produk: string;

  @IsOptional()
  @IsIn(Object.values(KategoriProduk), { message: 'Kategori produk tidak valid' })
  kategori_produk: KategoriProduk;

  @IsOptional()
  @IsInt()
  @Min(0)
  jumlah_produk_min: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  jumlah_produk_max: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  harga_produk_min: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  harga_produk_max: number;

  @IsOptional()
  @IsInt()
  @Min(2010)
  tahun_pembuatan_min: number;

  @IsOptional()
  @IsInt()
  @Max(2023)
  tahun_pembuatan_max: number;
}