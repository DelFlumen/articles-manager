import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum Role {
  GUEST = 'GUEST',
  REGISTERED_USER = 'REGISTERED_USER',
  ADMIN = 'ADMIN',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['GUEST', 'REGISTERED_USER', 'ADMIN'], {
    message: 'Valid role required',
  })
  role: Role;
}
