// prisma.config.ts
import { defineConfig } from "prisma/config";
import { config } from "dotenv";

// 1. Explicitly load .env.local (common in Next.js) AND .env
config({ path: ".env" }); 
config({ path: ".env.local" }); 

// prisma.config.ts
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    directUrl: process.env.DIRECT_URL, // Fixed typo from DIRCT_URL
    url: process.env.DATABASE_URL,
  },
});

