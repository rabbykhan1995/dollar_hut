import { PrismaClient } from "@prisma/client";
// Declare the `prisma` variable globally to ensure it is accessible in both environments
let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    // Configure production database connection options
    // e.g., use a database URL from environment variables
  });
} else {
  // For development, use a global singleton to avoid multiple instances
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      // Configure development database connection options
      // e.g., use local database credentials
    });
  }
  prisma = global.prisma;
}

export default prisma;
