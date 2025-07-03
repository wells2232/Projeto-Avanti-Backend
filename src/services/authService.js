const prisma = require("../lib/prisma");
const crypto = require("crypto");
const userRepository = require("../repository/userRepository");
const { emailQueue } = require("../config/queue");
const bcrypt = require("bcryptjs");

async function verifyUserEmail(token) {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

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

async function requestPasswordReset(email) {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const resetTokenExpiresAt = new Date(Date.now() + 1500000); // 25 minutos

  await prisma.users.update({
    where: { id: user.id },
    data: {
      passwordResetToken: hashedToken,
      passwordResetTokenExpiresAt: resetTokenExpiresAt,
    },
  });

  await emailQueue.add("password-reset", {
    userEmail: user.email,
    userName: user.name,
    resetToken: resetToken,
  });

  console.log("Token de redefinição de senha gerado e enviado por e-mail");
  return {
    success: true,
    message: "Instruções de redefinição de senha enviadas para o e-mail",
  };
}

async function resetUserPassword(token, newPassword) {
  if (newPassword.length < 6) {
    throw new Error("A nova senha deve ter pelo menos 6 caracteres");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await prisma.users.findFirst({
    where: {
      passwordResetToken: hashedToken,
      passwordResetTokenExpiresAt: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    throw new Error("Token de redefinição de senha inválido ou expirado");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const isSamePassword = await bcrypt.compare(newPassword, user.password);
  if (isSamePassword) {
    throw new Error("A nova senha não pode ser a mesma que a senha atual");
  }

  await prisma.users.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetTokenExpiresAt: null,
    },
  });

  return { success: true, message: "Senha redefinida com sucesso" };
}

module.exports = {
  verifyUserEmail,
  requestPasswordReset,
  resetUserPassword,
};
