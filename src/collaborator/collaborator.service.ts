import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';

@Injectable()
export class CollaboratorService {
  constructor(private prisma: PrismaService) {}

  async create(createCollaboratorDto: CreateCollaboratorDto) {
    return this.prisma.collaborator.create({
      data: {
        ...createCollaboratorDto,
        admissionDate: new Date(createCollaboratorDto.admissionDate),
        dismissalDate: createCollaboratorDto.dismissalDate
          ? new Date(createCollaboratorDto.dismissalDate)
          : null,
      },
    });
  }
}