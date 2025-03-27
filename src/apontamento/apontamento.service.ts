import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateApontamentoDto } from './dto/create-apontamento.dto';

@Injectable()
export class ApontamentoService {
  constructor(private prisma: PrismaService) {}

  async create(createApontamentoDto: CreateApontamentoDto) {
    // Verifica se colaborador e projeto existem
    const collaboratorExists = await this.prisma.collaborator.findUnique({
      where: { id: createApontamentoDto.collaboratorId },
    });

    const projectExists = await this.prisma.projeto.findUnique({
      where: { id: createApontamentoDto.projectId },
    });

    if (!collaboratorExists || !projectExists) {
      throw new Error('Colaborador ou projeto não encontrado');
    }

    // Cria o apontamento
    return this.prisma.apontamento.create({
      data: {
        date: new Date(createApontamentoDto.date),
        hoursWorked: createApontamentoDto.hoursWorked,
        collaboratorId: createApontamentoDto.collaboratorId,
        projectId: createApontamentoDto.projectId,
        task: createApontamentoDto.task,
        taskCode: createApontamentoDto.taskCode,
      },
    });
  }

  async createMany(apontamentos: CreateApontamentoDto[]) {
    return Promise.all(
      apontamentos.map((apontamento) => this.create(apontamento)),
    );
  }
}