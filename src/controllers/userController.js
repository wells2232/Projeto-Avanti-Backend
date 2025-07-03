const userService = require("../services/userService");

async function handleRegister(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const { newUser, token } = await userService.register({
      name,
      email,
      password,
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "None",
      secure: false,
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res
      .status(201)
      .json({ message: "Usuário registrado com sucesso", user: newUser });
  } catch (error) {
    if (error.message === "Este e-mail já está em uso") {
      return res.status(409).json({ type: "Conflict", message: error.message });
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

    const { token } = await userService.login(email, password);

    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 dia
    });

    return res.status(200).json({ message: "Login realizado com sucesso" });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}

async function handleGetCurrentUser(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao obter usuário atual:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function handleLogout(req, res) {
  res.clearCookie("accessToken");
  return res.status(200).json({ message: "Logout realizado com sucesso" });
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

async function handleUpdateUser(req, res) {
  const userId = req.params.id;
  const { name, email, phone, address, city } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios" });
  }

  try {
    const updatedUser = await userService.updateUser(userId, {
      name: name,
      email: email.trim().toLowerCase() || null,
      phone: phone || null,
      address: address || null,
      city: city || null,
    });

    return res.status(200).json({
      message: "Usuário atualizado com sucesso",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return res
      .status(500)
      .json({ error: "Erro interno do servidor:" + error.message });
  }
}

async function handleChangePassword(req, res) {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ error: "Senha atual e nova senha são obrigatórias" });
  }

  try {
    await userService.changePassword(userId, currentPassword, newPassword);
    return res.status(200).json({ message: "Senha alterada com sucesso" });
  } catch (error) {
    console.error("Erro ao alterar senha:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

module.exports = {
  userController: {
    handleRegister,
    handleLogin,
    handleLogout,
    handleGetCurrentUser,
    handleUpdateUser,
    handleChangePassword,
  },
};
