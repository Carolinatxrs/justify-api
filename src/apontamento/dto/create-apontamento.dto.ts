import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateApontamentoDto {
  @ApiProperty({ description: 'Data do apontamento (ISO string)' })
  @IsDateString()
  date: string;

  @ApiProperty({ description: 'Horas trabalhadas' })
  @IsNumber()
  hoursWorked: number;

  @ApiProperty({ description: 'ID do colaborador' })
  @IsNumber()
  collaboratorId: number;

  @ApiProperty({ description: 'ID do projeto' })
  @IsNumber()
  projectId: number;

  @ApiProperty({ description: 'Descrição da tarefa' })
  @IsString()
  task: string;

  @ApiProperty({ description: 'Código da tarefa' })
  @IsString()
  taskCode: string;
}