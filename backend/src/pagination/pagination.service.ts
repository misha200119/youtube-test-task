import { Injectable } from '@nestjs/common';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { SelectQueryBuilder, Repository } from 'typeorm';

@Injectable()
export class PaginationService {
  async paginate<T>(
    queryBuilder: SelectQueryBuilder<T>,
    options: IPaginationOptions,
    searchQuery?: string,
    entityAlias: string = 'entity',
  ): Promise<Pagination<T>> {
    if (searchQuery) {
      queryBuilder.where(
        `${entityAlias}.title ILIKE :search OR ${entityAlias}.description ILIKE :search`,
        {
          search: `%${searchQuery}%`,
        },
      );
    }
    return paginate(queryBuilder, options);
  }

  buildSearchQuery<T>(
    repository: Repository<T>,
    searchQuery?: string,
    selectFields?: string[],
    entityAlias: string = 'entity',
  ): SelectQueryBuilder<T> {
    const queryBuilder = repository.createQueryBuilder(entityAlias);

    if (selectFields?.length) {
      queryBuilder.select(
        selectFields.map((field) => `${entityAlias}.${field}`),
      );
    }

    return queryBuilder;
  }
}
