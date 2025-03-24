import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    try {
      return await this.prisma.projeto.create({
        data: {
          area: createProjectDto.area,
          project: createProjectDto.project,
          projectCode: createProjectDto.projectCode,
          subproject: createProjectDto.subproject,
          subprojectCode: createProjectDto.subprojectCode,
          startDate: new Date(createProjectDto.startDate),
          endDate: new Date(createProjectDto.endDate),
          managerId: createProjectDto.managerId,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') { // Código de erro do Prisma para violação de restrição única
        throw new ConflictException('Já existe um projeto ou subprojeto com esse código nesta área.');
      }
      throw error;
    }
  }
}
