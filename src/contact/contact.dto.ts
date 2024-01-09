import { OmitType, PartialType, PickType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsArray, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Length, MinLength, ValidateNested, minLength } from "class-validator";
import { PageRequestDto } from "src/utils/dto/page.dto";

export class UserContactDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsInt()
  notelp: number;
}

export class CreateUserContactDto extends OmitType(UserContactDto, ["id"]) { }

export class UpdateUserContactDto extends PickType(UserContactDto, ["firstName", "lastName", "email", "notelp"]) { }

export class DeleteUserContactDto extends OmitType(UserContactDto, ["id"]) { }

export class CreateContactArrayDto {
  @IsArray()
  @ValidateNested({each:true})
  @Type(() => CreateUserContactDto)
  data: CreateUserContactDto[];
}

export class DeleteContactsDto {
  @IsArray()
  @IsNotEmpty()
  data: number[];
}

export class FindContactDto extends PageRequestDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;
}