import { z } from 'zod';

/**
 * Frontend environment variable schema with Zod validation.
 * Validates at app startup and provides clear error messages.
 */
const envSchema = z.object({
  apiEndpoint: z.string().url('API endpoint must be a valid URL'),
});

export type AppEnv = z.infer<typeof envSchema>;

function getEnv(): AppEnv {
  const rawEnv = {
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT,
  };

  try {
    return envSchema.parse(rawEnv);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues
        .map((err) => `  - ${err.path.join('.')}: ${err.message}`)
        .join('\n');

      throw new Error(`Environment validation failed:\n${missingVars}\n\n`);
    }
    throw error;
  }
}

export const env = getEnv();
