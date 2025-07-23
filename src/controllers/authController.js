const authService = require("../services/authService");

async function handleVerifyEmail(req, res, next) {
  try {
    const { token } = req.body;
    if (!token) {
      return res
        .status(400)
        .json({ error: "Token de verificação é obrigatório" });
    }
    await authService.verifyUserEmail(token);
    return res.status(200).json({ message: "Email verificado com sucesso" });
  } catch (error) {
    next(error);
  }
}

async function handleRequestPasswordReset(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email é obrigatório" });
    }
    await authService.requestPasswordReset(email);
    return res
      .status(200)
      .json({ message: "Email de redefinição de senha enviado" });
  } catch (error) {
    next(error);
  }
}

async function handleResetPassword(req, res, next) {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({
        error: "Token e nova senha são obrigatórios",
      });
    }
    await authService.resetUserPassword(token, newPassword);
    return res.status(200).json({ message: "Senha redefinida com sucesso" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = {
  handleVerifyEmail,
  handleRequestPasswordReset,
  handleResetPassword,
};
