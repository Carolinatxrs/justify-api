import { Injectable } from '@nestjs/common';
import { CreateJustificativaDtoType } from './dto/create-justificativa.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JustificativaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createJustificativaDto: CreateJustificativaDtoType) {
    const { collaboratorId, justification, status } = createJustificativaDto;
    return await this.prisma.justification.create({
      data: {
        collaboratorId,
        justification,
        status,
      },
    });
  }
}
