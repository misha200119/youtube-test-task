export type SearchHistory = {
  id: number;
  query: string;
  timestamp: Date;
};

export type HistoryResponse = {
  history: SearchHistory[];
};
