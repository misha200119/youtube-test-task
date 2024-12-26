import { ApiProperty } from '@nestjs/swagger';
import { VideoDto } from './video.dto';

export class VideoResponseDto {
  @ApiProperty({ type: [VideoDto] })
  results: VideoDto[];

  @ApiProperty({ example: 10000000 })
  totalResults: number;

  @ApiProperty({ example: 'CAUQAA', nullable: true })
  nextPageToken: string | null;

  @ApiProperty({ example: null, nullable: true })
  prevPageToken: string | null;
}
