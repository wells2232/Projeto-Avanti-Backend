const { PrismaClient } = require("@prisma/client");

// Adiciona o prisma ao objeto global do Node.js para evitar criar
// múltiplas instâncias durante o hot-reloading no ambiente de desenvolvimento.
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// Exporta a instância única
module.exports = prisma;
