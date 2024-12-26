import { ApiProperty } from '@nestjs/swagger';

export class SearchAnalyticsDto {
  @ApiProperty()
  query: string;

  @ApiProperty()
  count: number;
}
