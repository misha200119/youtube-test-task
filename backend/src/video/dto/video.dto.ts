import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsUrl, IsNumber, Min } from 'class-validator';

export class VideoDto {
  @ApiProperty({ example: 'dQw4w9WgXcQ' })
  @IsString()
  videoId: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsUrl()
  thumbnailUrl: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  viewCount: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  likeCount: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  commentCount: number;
}
