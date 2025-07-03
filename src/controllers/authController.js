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

module.exports = {
  handleVerifyEmail,
};
