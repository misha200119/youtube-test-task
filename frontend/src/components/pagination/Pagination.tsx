import { FC } from 'react';
import {
  Pagination as FlowbitePagination,
  PaginationProps,
} from 'flowbite-react';
import { paginationTheme } from './utils';

export const Pagination: FC<PaginationProps> = (props) => {
  return <FlowbitePagination theme={paginationTheme} {...props} showIcons />;
};
