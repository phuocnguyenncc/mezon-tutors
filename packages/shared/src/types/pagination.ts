import { z } from 'zod';

/**
 * Base pagination schema for API requests
 */
export const PaginationSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type PaginationInput = z.infer<typeof PaginationSchema>;

export interface PaginationMeta {
  nextCursor?: string;
  hasMore: boolean;
}
