import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LatihanModule } from './latihan/latihan.module';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './app/auth/auth.module';
import { MailModule } from './app/mail/mail.module';
import { ContactModule } from './contact/contact.module';
import { ProdukModule } from './produk/produk.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), LatihanModule, BookModule, AuthModule, MailModule, ContactModule, ProdukModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  },],
})
export class AppModule { }
