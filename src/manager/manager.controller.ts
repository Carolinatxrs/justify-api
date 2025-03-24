import { Body, Controller, Post } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { AssignManagerDto } from './dto/assign-manager.dto';

@Controller('managers')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managerService.create(createManagerDto);
  }

  @Post('assign')
  assignManager(@Body() assignManagerDto: AssignManagerDto) {
    return this.managerService.assignManager(assignManagerDto);
  }
}