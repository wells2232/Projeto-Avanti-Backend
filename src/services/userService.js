const bcrypt = require("bcryptjs");
const userRepository = require("../repository/userRepository");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { emailQueue } = require("../config/queue");
const prisma = require("../lib/prisma");

async function register(userData) {
  const { name, email, password, city, state } = userData;

  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error("Este e-mail já está em uso");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const formattedEmail = email.trim().toLowerCase();

  const verificationToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  const tokenExpiration = new Date(Date.now() + 3600000); // 1 hora

  const newUser = await userRepository.create({
    name,
    email: formattedEmail,
    password: hashedPassword,
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpiresAt: tokenExpiration,
    city,
    state,
  });

  await emailQueue.add("send-verification-email", {
    userEmail: newUser.email,
    verificationToken: verificationToken,
  });

  console.log(`Job para enviar e-mail para ${newUser.email} adicionado à fila`);

  const payload = {
    id: newUser.id,
    name: newUser.name,
    role: newUser.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  const {
    password: _,
    emailVerificationToken,
    ...userWithoutPassword
  } = newUser;

  console.log("Usuário registrado:", userWithoutPassword);
console.log("Token:", token);


  return { user: userWithoutPassword, token };
}

async function login(email, password) {
  const formattedEmail = email.trim().toLowerCase();
  const user = await userRepository.findUserByEmail(formattedEmail);
  if (!user) {
    throw new Error("Credenciais inválidas");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log(isPasswordValid)
  if (!isPasswordValid) {
    throw new Error("Credenciais inválidas");
  }

  const payload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  return { token };
}

async function updateUser(id, userData) {
  const dataForRepo = userData;

  console.log("Dados para atualização do usuário:", dataForRepo);

  const currentUser = await userRepository.findUserById(id);

  const user = await userRepository.findUserByEmail(userData.email);

  if (currentUser.email === userData.email) {
    const { name, city, state } = await userRepository.update(id, dataForRepo);
    return { name, city, state };
  } else if (user.email === userData.email) {
    throw new Error("Este e-mail já está em uso");
  }
 
}

async function changePassword(userId, currentPassword, newPassword) {
  if (newPassword.length < 6) {
    throw new Error("A nova senha deve ter pelo menos 6 caracteres");
  }

  const user = await prisma.users.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password
  );
  if (!isCurrentPasswordValid) {
    throw new Error("Senha atual inválida");
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  const updatedUser = await userRepository.update(userId, {
    password: hashedNewPassword,
  });

  return updatedUser;
}

module.exports = {
  register,
  login,
  changePassword,
  updateUser,
};
