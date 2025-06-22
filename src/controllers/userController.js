const userServices = require("../services/userService");

async function handleRegister(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const newUser = await userServices.register({ name, email, password });
    return res
      .status(201)
      .json({ message: "Usuário registrado com sucesso", user: newUser });
  } catch (error) {
    if (error.message === "Este e-mail já está em uso") {
      return res.status(409).json({ error: error.message });
    }
    console.error("Erro ao registrar usuário:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    const { token } = await userServices.login(email, password);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}

// async function handleGetAllUsers(req, res) {
//   try {
//     const users = await userServices.findAllUsers();
//     return res.status(200).json(users);
//   } catch (error) {
//     console.error("Erro ao buscar usuários:", error);
//     return res.status(500).json({ error: "Erro interno do servidor" });
//   }
// }

module.exports = {
  userController: {
    handleRegister,
    handleLogin,
  },
};
