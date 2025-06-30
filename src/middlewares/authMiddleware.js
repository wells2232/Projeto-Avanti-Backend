const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  // console.log("Cookies recebidos:", req.cookies);
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      message:
        "Token de autenticação não encontrado. Faça login para acessar este recurso.",
      errorCode: "AUTH_TOKEN_MISSING",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, userPayload) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Token inválido ou expirado. Por favor, faça login novamente.",
        errorCode: "AUTH_TOKEN_INVALID",
      });
    }

    req.user = userPayload;
    next();
  });
}

async function isAdmin(req, res, next) {
  const user = req.user;
  if (user.role && user.role === "ADMIN") {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: "Acesso negado. Você não tem permissão para acessar este recurso.",
    errorCode: "AUTH_ACCESS_DENIED",
  });
}

module.exports = {
  authenticateToken,
  isAdmin,
};
