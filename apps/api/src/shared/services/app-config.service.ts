import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

/**
 * Environment variable schema with Zod validation
 * All required variables will throw clear errors if missing
 */
const envSchema = z.object({
  // Server
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  CORS_ORIGINS: z.string().optional(),

  // Frontend
  FRONTEND_URL: z.string().url().default('http://localhost:3000'),

  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
});

type EnvConfig = z.infer<typeof envSchema>;

@Injectable()
export class AppConfigService {
  private readonly env: EnvConfig;

  constructor(private configService: ConfigService) {
    // Validate all environment variables at startup
    const rawEnv = {
      PORT: this.configService.get('PORT'),
      NODE_ENV: this.configService.get('NODE_ENV'),
      CORS_ORIGINS: this.configService.get('CORS_ORIGINS'),
      FRONTEND_URL: this.configService.get('FRONTEND_URL'),
      DATABASE_URL: this.configService.get('DATABASE_URL'),
    };

    try {
      this.env = envSchema.parse(rawEnv);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const missingVars = error.issues
          .map((err) => `  - ${err.path.join('.')}: ${err.message}`)
          .join('\n');
        throw new Error(
          `Environment validation failed:\n${missingVars}\n\nPlease check your .env file.`
        );
      }
      throw error;
    }
  }

  get port(): number {
    return this.env.PORT;
  }

  get nodeEnv(): string {
    return this.env.NODE_ENV;
  }

  get corsOrigins(): string | undefined {
    return this.env.CORS_ORIGINS;
  }

  get frontendUrl(): string {
    return this.env.FRONTEND_URL;
  }

  get databaseUrl(): string {
    return this.env.DATABASE_URL;
  }

  get vercelEnv(): string {
    return process.env.VERCEL_ENV || '';
  }

  // Helper generic method if needed for other keys
  get(key: string): string {
    return this.configService.get<string>(key) || '';
  }
}
