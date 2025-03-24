import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class CreateManagerDto {
  @ApiProperty({ description: 'Matrícula do gestor' })
  @IsString()
  registration: string;

  @ApiProperty({ description: 'Nome do gestor' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Cargo do gestor' })
  @IsString()
  role: string;

  @ApiProperty({ description: 'Email do gestor' })
  @IsEmail()
  email: string;
}