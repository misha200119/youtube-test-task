import { ApiProperty } from '@nestjs/swagger';

export class SearchHistoryDto {
  @ApiProperty()
  query: string;

  @ApiProperty()
  timestamp: Date;
}
