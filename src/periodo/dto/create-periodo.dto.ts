import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';

export class CreatePeriodoJustificativaDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  projectId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  managerId: number;

  @ApiProperty({ enum: ['30 dias', '90 dias', '180 dias'] })
  @IsString()
  @IsNotEmpty()
  periodicity: string;

  @ApiProperty()
  @IsBoolean()
  active: boolean;

  @ApiProperty()
  @IsNotEmpty()
  startJustificationDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  endJustificationDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  startReportDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  endReportDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  startBaseYear: Date;

  @ApiProperty()
  @IsNotEmpty()
  endBaseYear: Date;
}