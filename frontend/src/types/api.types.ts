export type SearchParams = {
  q: string;
  maxResults: number;
  pageToken: string;
};

export type SearchResponse<T> = {
  results: T[];
  totalResults: number;
  nextPageToken: string | null;
  prevPageToken: string | null;
};
