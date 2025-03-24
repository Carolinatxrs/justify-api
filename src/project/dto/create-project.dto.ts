import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsInt } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ description: 'Nome da área' })
  @IsString()
  area: string;

  @ApiProperty({ description: 'Nome do projeto' })
  @IsString()
  project: string;

  @ApiProperty({ description: 'Código do projeto' })
  @IsString()
  projectCode: string;

  @ApiProperty({ description: 'Nome do subprojeto' })
  @IsString()
  subproject: string;

  @ApiProperty({ description: 'Código do subprojeto' })
  @IsString()
  subprojectCode: string;

  @ApiProperty({ description: 'Data de início do projeto' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: 'Data de término do projeto' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ description: 'ID do gestor responsável' })
  @IsInt()
  managerId: number;
}