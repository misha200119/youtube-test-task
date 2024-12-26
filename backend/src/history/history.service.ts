import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchHistory } from './history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(SearchHistory)
    private historyRepository: Repository<SearchHistory>,
  ) {}

  async create(query: string): Promise<SearchHistory> {
    const history = this.historyRepository.create({ query });
    return this.historyRepository.save(history);
  }

  async findAll() {
    const history = await this.historyRepository.find({
      order: { timestamp: 'DESC' },
    });
    return { history };
  }
}
