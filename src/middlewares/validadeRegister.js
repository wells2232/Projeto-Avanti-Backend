const Filter = require("bad-words");
const filter = new Filter();

function validateRegister(req, res, next) {
  const { name, email, password } = req.body;

  if (!name || name.trim().length < 3) {
    return res
      .status(400)
      .json({ message: "Nome deve ter pelo menos 3 letras." });
  }

  if (filter.isProfane(name)) {
    return res
      .status(400)
      .json({ message: "Nome contém linguagem inapropriada." });
  }

  // validação simples de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Email inválido." });
  }

  // validação de senha (mínimo 6 caracteres)
  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: "Senha deve ter ao menos 6 caracteres." });
  }

  // se passou nas validações, segue para o próximo middleware/controller
  next();
}

module.exports = {
  validateRegister,
};
