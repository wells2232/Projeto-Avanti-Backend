const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  console.log("Cookies recebidos:", req.cookies); // 👈
  console.log("Headers:", req.headers);

  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, userPayload) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido" });
    }

    req.user = userPayload;
    next();
  });
}

module.exports = {
  authenticateToken,
};
