function isAdmin(req, res, next) {
  const user = req.user;
  console.log("Verificando se o usuário é um administrador:", user);
  if (user.role && user.role === "ADMIN") {
    return next();
  }

  console.log("o usuário não é um administrador:", user.role);

  return res.status(403).json({
    success: false,
    message: "Acesso negado. Você não tem permissão para acessar este recurso.",
    errorCode: "AUTH_ACCESS_DENIED",
  });
}

module.exports = {
  isAdmin,
};
