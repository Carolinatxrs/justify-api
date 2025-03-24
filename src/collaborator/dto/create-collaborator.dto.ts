import { ApiProperty } from '@nestjs/swagger';  
import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateCollaboratorDto {
  @ApiProperty({ description: 'Nome do colaborador' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Matrícula do colaborador' })
  @IsString()
  registration: string;

  @ApiProperty({ description: 'CPF do colaborador' })
  @IsString()
  cpf: string;

  @ApiProperty({ description: 'Email do colaborador' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Data de admissão do colaborador' })
  @IsDateString()
  admissionDate: string;

  @ApiProperty({ description: 'Data de demissão do colaborador', required: false })
  @IsDateString()
  @IsOptional()
  dismissalDate?: string;

  @ApiProperty({ description: 'Situação do colaborador', default: 'ativo' })
  @IsString()
  status: string;

  @ApiProperty({ description: 'Cargo do colaborador' })
  @IsString()
  role: string;

  @ApiProperty({ description: 'Formação do colaborador' })
  @IsString()
  education: string;
}