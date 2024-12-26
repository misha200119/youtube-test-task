import { Controller, Get } from '@nestjs/common';
import { HistoryService } from './history.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('history')
@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get()
  async getHistory() {
    return this.historyService.findAll();
  }
}
