import { Module } from '@nestjs/common';
import { JustificativaModule } from './justificativa/justificativa.module';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { ManagerModule } from './manager/manager.module';

@Module({
  imports: [JustificativaModule, CollaboratorModule, ManagerModule],
})
export class AppModule {}
