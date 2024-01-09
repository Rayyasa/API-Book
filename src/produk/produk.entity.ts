import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { KategoriProduk } from "./enum";



@Entity()
export class Produk extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nama_produk: string;

  @Column({ type: 'enum', enum: KategoriProduk })
  kategori_produk: KategoriProduk;

  @Column()
  harga_produk: number

  @Column()
  jumlah_produk: number

  @Column()
  deskripsi_produk: string

  @Column()
  tahun_pembuatan: number

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
export { KategoriProduk };

