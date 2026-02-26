import { z } from 'zod';
import { PaginationMeta } from './pagination';

export interface AppError {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiResponse<T> {
  data: T | null;
  error: AppError | null;
}

export interface PaginatedData<T> {
  items: T[];
  meta: PaginationMeta;
}

export interface PaginatedResponse<T> extends ApiResponse<PaginatedData<T>> {}
