import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ResponsePagination, ResponseSuccess } from '../interface';
import { createProductArrayDto, createProductDto, DeleteProductArrayDto, FindProductDto, UpdateProductDto } from './produk.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { KategoriProduk, Produk } from './produk.entity';
import BaseResponse from 'src/utils/response/base.response';
import { Between, Like, Repository } from 'typeorm';
import { validate } from 'class-validator';
import { title } from 'process';
@Injectable()
export class ProdukService extends BaseResponse {
  constructor(@InjectRepository(Produk) private readonly produkRepository: Repository<Produk>
  ) {
    super();
  }

  async getAllProduk(FindProductDto: FindProductDto): Promise<ResponsePagination> {
    const { page, pageSize, nama_produk, limit, kategori_produk, harga_produk_max, harga_produk_min, tahun_pembuatan_min, tahun_pembuatan_max, jumlah_produk_max, jumlah_produk_min, } = FindProductDto;


    const filter: {
      [key: string]: any;
    } = {};

    if (nama_produk) {
      filter.nama_produk = Like(`%${nama_produk}%`);
    }
    if (kategori_produk) {
      filter.kategori_produk = KategoriProduk;
    }
    if (harga_produk_min !== undefined && harga_produk_max !== undefined) {
      filter.harga_produk = Between(harga_produk_min, harga_produk_max);
    }

    if (tahun_pembuatan_min !== undefined && tahun_pembuatan_max !== undefined) {
      filter.tahun_pembuatan = Between(tahun_pembuatan_min, tahun_pembuatan_max);
    }

    if (jumlah_produk_min !== undefined && jumlah_produk_max !== undefined) {
      filter.jumlah_produk = Between(jumlah_produk_min, jumlah_produk_max);
    }

    const order: { [key: string]: 'ASC' | 'DESC' } = {};
    order.created_at = 'ASC';

    const total = await this.produkRepository.count(
      {
        where: filter
      }
    );

    const result = await this.produkRepository.find({
      where: filter, order,
      skip: limit,
      take: Number(pageSize),
    });

    const total_page = Math.ceil(total / pageSize);
    const remaining_page = total_page - Number(page)
    return this._Pagination('Buku ditemukan!', result, total, page, pageSize, total_page, remaining_page)
  }
  async getDetail(id: number): Promise<ResponseSuccess> {
    const detailProduk = await this.produkRepository.findOne({
      where: {
        id,
      },
    });

    if (detailProduk === null) {
      throw new NotFoundException(`Produk dengan id ${id} tidak ditemukan`);
    }
    return {
      status: 'Success',
      message: 'Detail Produk ditemukan',
      data: detailProduk,
    };
  }
  async createProduk(createProdukDto: createProductDto): Promise<ResponseSuccess> {
    const { nama_produk, kategori_produk, harga_produk, jumlah_produk, deskripsi_produk, tahun_pembuatan } = createProdukDto;

    try {
      await this.produkRepository.save({
        nama_produk: nama_produk,
        kategori_produk: kategori_produk,
        harga_produk: harga_produk,
        jumlah_produk: jumlah_produk,
        deskripsi_produk: deskripsi_produk,
        tahun_pembuatan: tahun_pembuatan
      });
      return this._Success('Berhasil membuat Produk', createProdukDto);
    } catch (err) {
      throw new HttpException('Ada kesalahan', HttpStatus.BAD_REQUEST)
    }
  }

  async updateProduct(
    id: number,
    payload: UpdateProductDto,
  ): Promise<ResponseSuccess> {
    console.log('tes');
    const check = await this.produkRepository.findOne({
      where: {
        id: id,
      },
    });

    if (check === null) {
      throw new NotFoundException(`Produk dengan id ${id} tidak ditemukan`);
    }
    console.log('sebelum update', payload);
    const update = await this.produkRepository.save({ id, ...payload });
    console.log('setelah update', update);

    return this._Success('Berhasil mengupdate Produk', update)
  }



  async deleteProduk(id: number): Promise<ResponseSuccess> {
    const check = await this.produkRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!check) {
      throw new NotFoundException(`Produk dengan id ${id} tidak ditemukan`);
    }

    await this.produkRepository.delete(id)

    return this._Success('Berhasil menghapus Produk!')
  }

  async bulkCreate(payload: createProductArrayDto): Promise<ResponseSuccess> {
    try {
      let berhasil = 0;
      let gagal = 0;
      await Promise.all(
        payload.data.map(async (item) => {
          try {
            await this.produkRepository.save(item);
            berhasil = berhasil + 1;
          } catch {
            gagal = gagal + 1;
          }
        })
      )
      return this._Success(`Berhasil menambahkan buku sebanyak ${berhasil} dan gagal sebanyak ${gagal}`, payload)
    } catch {
      throw new HttpException('ada kesalahan', HttpStatus.BAD_REQUEST)
    }
  }


  async bulkDelete(payload: DeleteProductArrayDto): Promise<ResponseSuccess> {
    try {
      let berhasil = 0;
      let gagal = 0;
      await Promise.all(
        payload.data.map(async (item) => {
          try {


            const result = await this.produkRepository.delete(item);

            if (result.affected === 0) {
              gagal = gagal + 1;
            } else {

              berhasil = berhasil + 1;
            }

          } catch {
            gagal = gagal + 1;
          }
        })
      )

      return this._Success(`Berhasil menghapus produk sebanyak ${berhasil} dan gagal sebanyak ${gagal}`, payload)
    } catch {
      throw new HttpException('ada kesalahan', HttpStatus.BAD_REQUEST)
    }
  }
}