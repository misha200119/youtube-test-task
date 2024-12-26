import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { decodePageToken } from '../pagination.utils';

export class PaginationQueryDto {
  @IsOptional()
  @IsString()
  pageToken?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  maxResults?: number = 10;

  @IsOptional()
  @IsString()
  q?: string;

  getPagination(): { page: number; limit: number } {
    return {
      page: this.pageToken ? decodePageToken(this.pageToken) : 1,
      limit: this.maxResults || 10,
    };
  }
}
