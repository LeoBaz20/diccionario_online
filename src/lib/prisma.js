import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  // En producción, crea una nueva instancia de PrismaClient
  prisma = new PrismaClient();
} else {
  // En desarrollo, utiliza una variable global para preservar la instancia de PrismaClient
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;