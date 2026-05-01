// Types génériques pour les réponses IPC
export type IpcHandler<TArgs = void, TReturn = void> = (args: TArgs) => Promise<TReturn>;

export type IpcResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Types pour la pagination (à utiliser plus tard)
export type PaginationParams = {
  page: number;
  limit: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
