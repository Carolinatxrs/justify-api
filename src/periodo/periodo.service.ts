import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePeriodoJustificativaDto } from './dto/create-periodo.dto';


@Injectable()
export class PeriodoJustificativaService {
  constructor(private prisma: PrismaService) {}

  async create(createPeriodoJustificativaDto: CreatePeriodoJustificativaDto) {
    return this.prisma.periodoJustificativa.create({
      data: {
        ...createPeriodoJustificativaDto,
      },
      include: {
        project: true,
        manager: true,
      },
    });
  }

  async createMany(periodos: CreatePeriodoJustificativaDto[]) {
    return this.prisma.$transaction(
      periodos.map((periodo) =>
        this.prisma.periodoJustificativa.create({
          data: periodo,
          include: {
            project: true,
            manager: true,
          },
        })
      )
    );
  }
}