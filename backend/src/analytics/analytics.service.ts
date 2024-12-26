import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchAnalytics } from './analytics.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(SearchAnalytics)
    private analyticsRepository: Repository<SearchAnalytics>,
  ) {}

  async incrementSearchCount(query: string): Promise<void> {
    const analytics = await this.analyticsRepository.findOne({
      where: { query },
    });
    if (analytics) {
      analytics.count++;
      await this.analyticsRepository.save(analytics);
    } else {
      await this.analyticsRepository.save({ query, count: 1 });
    }
  }

  async getPopularSearches() {
    const analytics = await this.analyticsRepository.find({
      order: { count: 'DESC' },
      take: 10,
    });
    return { analytics };
  }
}
