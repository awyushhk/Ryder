
// globalThis.prisma: This global variable ensures that the Prisma client instance is
// reused across hot reloads during development. Without this, each time your application
// reloads, a new instance of the Prisma client would be created, potentially leading
// to connection issues.

import { PrismaClient } from "@prisma/client";

// Define the global type for the Prisma instance to satisfy TypeScript
declare global {
  var prisma: PrismaClient | undefined;
}

export const db =
  globalThis.prisma ||
  new PrismaClient({
    // In v7, explicitly passing the URL is often required if not using a driver adapter
    datasourceUrl: process.env.DATABASE_URL, 
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

