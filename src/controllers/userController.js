const userService = require("../services/userService");
const userRepository = require("../repository/userRepository");

async function handleRegister(req, res) {
  try {
    const { name, email, password, city, state } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const { user, token } = await userService.register({
      name,
      email,
      password,
      city,
      state
    });

    console.log("Token gerado:", token);


    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 dia
    });

    return res
      .status(201)
      .json({ message: "Usuário registrado com sucesso", user });
  } catch (error) {
    if (error.message === "Este e-mail já está em uso") {
      return res.status(409).json({
        message: 'Um ou mais campos estão inválidos!',
        errors: {
          email: ['Este e-mail já está em uso']
        }
      });
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
    // Verifica se o usuário está autenticado e se existe no banco de dados
    const dbUser = await userRepository.findUserById(user.id);
    if (!dbUser) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const { id, name, email, city, state } = dbUser;

    return res.status(200).json({  ...user, id, name, email, city, state  });
  } catch (error) {
    console.error("Erro ao obter usuário atual:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function handleLogout(req, res) {
  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  };
  res.clearCookie("accessToken", cookieOptions);
  console.log(res.cookies);
  console.log("Usuário deslogado com sucesso");
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
  const { name, email, city, state } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios" });
  }

  try {
    const updatedUser = await userService.updateUser(userId, {
      name: name,
      email: email.trim().toLowerCase() || null,
      city: city || null,
      state: state || null, 
    });

    return res.status(200).json({
      message: "Usuário atualizado com sucesso",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return res
      .status(500)
      .json({ error: error.message });
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
  handleRegister,
  handleLogin,
  handleLogout,
  handleGetCurrentUser,
  handleUpdateUser,
  handleChangePassword,
};
