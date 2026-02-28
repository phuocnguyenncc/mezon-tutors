import { atom } from 'jotai';
import type { User } from '@mezon-tutors/shared';

/**
 * Currently authenticated user profile
 */
export const userAtom = atom<User | null>(null);
