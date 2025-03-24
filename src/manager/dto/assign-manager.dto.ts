import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AssignManagerDto {
  @ApiProperty({ description: 'Matrícula do colaborador' })
  @IsString()
  collaboratorRegistration: string;

  @ApiProperty({ description: 'Matrícula do gestor' })
  @IsString()
  managerRegistration: string;
}