const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
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

module.exports = {
  isAuthenticated: authenticateToken,
};
