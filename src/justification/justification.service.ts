import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJustificationDto } from './dto/create-justification.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JustificationService {
  constructor(private prisma: PrismaService) { }

  async create(createJustificationDto: CreateJustificationDto) {
    // Verifica se o colaborador existe
    const collaborator = await this.prisma.collaborator.findUnique({
      where: { id: createJustificationDto.collaboratorId },
    });
    if (!collaborator) {
      throw new NotFoundException('Colaborador não encontrado');
    }

    // Verifica se o projeto existe
    const project = await this.prisma.projeto.findUnique({
      where: { id: createJustificationDto.projectId },
    });
    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    // Verifica se o gestor existe
    const manager = await this.prisma.manager.findUnique({
      where: { id: createJustificationDto.managerId },
    });
    if (!manager) {
      throw new NotFoundException('Gestor não encontrado');
    }

    // Verifica se o período existe
    const periodo = await this.prisma.periodoJustificativa.findUnique({
      where: { id: createJustificationDto.periodoId },
    });
    if (!periodo) {
      throw new NotFoundException('Período de justificativa não encontrado');
    }

    // Cria a justificativa
    return this.prisma.justification.create({
      data: {
        collaborator: { connect: { id: createJustificationDto.collaboratorId } },
        project: { connect: { id: createJustificationDto.projectId } },
        manager: { connect: { id: createJustificationDto.managerId } },
        periodo: { connect: { id: createJustificationDto.periodoId } },
        justification: createJustificationDto.justification,
        status: createJustificationDto.status,
        startJustificationDate: new Date(createJustificationDto.startJustificationDate),
        endJustificationDate: new Date(createJustificationDto.endJustificationDate),
      },
      include: {
        collaborator: true,
        project: true,
        manager: true,
        periodo: true,
      },
    });
  }
}