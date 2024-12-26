import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SearchParams, SearchResponse } from '../types/api.types';
import { Video } from '../types/video.type';
import { HistoryResponse } from '../types/history';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_BASE_URL }),
  endpoints: (builder) => ({
    searchVideos: builder.query<SearchResponse<Video>, SearchParams>({
      query: (params) => ({
        url: '/video/search',
        params: {
          q: params.q,
          pageToken: params.pageToken,
          maxResults: params.maxResults,
        },
      }),
    }),
    getVideoById: builder.query({
      query: (id) => `/video/details/${id}`,
    }),
    getSearchHistory: builder.query<HistoryResponse, null>({
      query: () => '/history',
    }),
    getAnalytics: builder.query({
      query: () => '/analytics',
    }),
  }),
});

export const {
  useSearchVideosQuery,
  useGetVideoByIdQuery,
  useGetSearchHistoryQuery,
  useGetAnalyticsQuery,
} = api;
