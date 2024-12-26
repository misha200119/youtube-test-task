import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaginationQueryDto } from 'src/pagination/dto/pagination-query.dto';
import { VideoService } from './video.service';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { VideoResponseDto } from './dto/search-video.dto';
import { VideoDto } from './dto/video.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('/details/:id')
  @ApiOperation({ summary: 'Get video details by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, type: VideoDto })
  findOne(@Param('id') id: string): Promise<VideoDto> {
    return this.videoService.findById(id);
  }

  @Get('/search')
  @ApiOperation({ summary: 'Search YouTube videos' })
  @ApiQuery({ name: 'q', required: true, type: String })
  @ApiQuery({ name: 'pageToken', required: false, type: String })
  @ApiQuery({ name: 'maxResults', required: false, type: Number, default: 10 })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated video search results',
    type: VideoResponseDto,
  })
  async search(
    @Query('q') query: string,
    @Query('pageToken') pageToken?: string,
    @Query('maxResults') maxResults?: number,
  ) {
    const searchQuery = new PaginationQueryDto();
    searchQuery.q = query;
    searchQuery.pageToken = pageToken;
    searchQuery.maxResults = maxResults;

    return this.videoService.search(searchQuery);
  }
}
