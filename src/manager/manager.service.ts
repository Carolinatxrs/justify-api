import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { AssignManagerDto } from './dto/assign-manager.dto';

@Injectable()
export class ManagerService {
  constructor(private prisma: PrismaService) {}

  async create(createManagerDto: CreateManagerDto) {
    return this.prisma.manager.create({
      data: createManagerDto,
    });
  }

  async assignManager(assignManagerDto: AssignManagerDto) {
    const { collaboratorRegistration, managerRegistration } = assignManagerDto;

    // Busca o colaborador e o gestor
    const collaborator = await this.prisma.collaborator.findUnique({
      where: { registration: collaboratorRegistration },
    });

    const manager = await this.prisma.manager.findUnique({
      where: { registration: managerRegistration },
    });

    if (!collaborator || !manager) {
      throw new Error('Colaborador ou gestor não encontrado');
    }

    // Relaciona o gestor ao colaborador
    return this.prisma.managerCollaboratorRelation.create({
      data: {
        collaboratorId: collaborator.id,
        managerId: manager.id,
      },
    });
  }
}