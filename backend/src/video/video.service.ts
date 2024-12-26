import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { HistoryService } from 'src/history/history.service';
import { PaginationQueryDto } from 'src/pagination/dto/pagination-query.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { Repository } from 'typeorm';
import { Video } from './video.entity';
import { VideoDto } from './dto/video.dto';
import seedVideos from './videos.seed.json';

@Injectable()
export class VideoService implements OnModuleInit {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
    private paginationService: PaginationService,
    private historyService: HistoryService,
    private analyticsService: AnalyticsService,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  async findById(id: string): Promise<VideoDto> {
    const video = await this.videoRepository.findOne({
      where: { videoId: id },
    });

    if (!video) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }

    return video;
  }

  async search(query: PaginationQueryDto) {
    const pagination = await this.paginationService.paginate(
      this.videoRepository
        .createQueryBuilder('video')
        .select([
          'video.videoId',
          'video.title',
          'video.description',
          'video.thumbnailUrl',
          'video.publishedAt',
        ]),
      {
        page: parseInt(query.pageToken) || 1,
        limit: query.maxResults || 10,
      },
      query.q,
      'video',
    );

    await this.historyService.create(query.q);
    await this.analyticsService.incrementSearchCount(query.q);

    return {
      results: pagination.items,
      totalResults: pagination.meta.totalItems,
      nextPageToken:
        pagination.meta.currentPage < pagination.meta.totalPages
          ? (pagination.meta.currentPage + 1).toString()
          : null,
      prevPageToken:
        pagination.meta.currentPage > 1
          ? (pagination.meta.currentPage - 1).toString()
          : null,
    };
  }

  async seed() {
    const videoCount = await this.videoRepository.count();

    if (videoCount === 0) {
      for await (const video of seedVideos) {
        const videoCreated = this.videoRepository.create(video);
        await this.videoRepository.save(videoCreated);
      }

      console.log('Videos seeded successfully');
    }
  }
}
