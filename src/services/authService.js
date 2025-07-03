const prisma = require("../lib/prisma");
const crypto = require("crypto");

async function verifyUserEmail(token) {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  console.log("--- DEBUG DE VERIFICAÇÃO ---");
  console.log("Token recebido do Postman:", token);
  console.log("Token transformado em Hash:", hashedToken);
  console.log("--------------------------");

  const user = await prisma.users.findFirst({
    where: {
      emailVerificationToken: hashedToken,
      emailVerificationTokenExpiresAt: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    throw new Error("Token de verificação inválido ou expirado");
  }

  await prisma.users.update({
    where: { id: user.id },
    data: {
      isEmailVerified: true,
      emailVerificationToken: null,
      emailVerificationTokenExpiresAt: null,
    },
  });

  return { success: true, message: "Email verificado com sucesso" };
}

module.exports = {
  verifyUserEmail,
};
