// prisma.config.ts
import { defineConfig, env } from "prisma/config";
import { config } from "dotenv";

// 1. Explicitly load .env.local (common in Next.js) AND .env
config({ path: ".env" }); 
config({ path: ".env.local" }); 

// prisma.config.ts
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});

