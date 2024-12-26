import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  constructor(partial: Partial<LoginDto>) {
    Object.assign(this, partial);
  }

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  tenantDomain!: string;
}