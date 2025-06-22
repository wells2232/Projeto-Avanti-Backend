const bcrypt = require("bcryptjs");
const userRepository = require("../repository/userRepository");
const jwt = require("jsonwebtoken");

async function register(userData) {
  const { name, email, password } = userData;

  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error("Este e-mail já está em uso");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userRepository.create({
    name,
    email,
    password: hashedPassword,
  });

  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

async function login(email, password) {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new Error("Credenciais inválidas");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Credenciais inválidas");
  }

  const payload = {
    id: user.id,
    name: user.name,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  return { token };
}

module.exports = {
  register,
  login,
};
