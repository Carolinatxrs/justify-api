import { Module } from '@nestjs/common';
import { JustificativaModule } from './justificativa/justificativa.module';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { ManagerModule } from './manager/manager.module';
import { ProjectModule } from './project/project.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [JustificativaModule, CollaboratorModule, ManagerModule, ProjectModule],
  providers: [PrismaService],
})
export class AppModule {}
