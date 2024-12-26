import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './video.entity';
import { ConfigModule } from '@nestjs/config';
import { PaginationService } from 'src/pagination/pagination.service';
import { HistoryModule } from 'src/history/history.module';
import { AnalyticsModule } from 'src/analytics/analytics.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Video]),
    ConfigModule,
    HistoryModule,
    AnalyticsModule,
  ],
  providers: [VideoService, PaginationService],
  controllers: [VideoController],
})
export class VideoModule {}
