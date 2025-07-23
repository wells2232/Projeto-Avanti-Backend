const Filter = require("bad-words");
const filter = new Filter();

function validateRegister(req, res, next) {

  // Verifica se o corpo da requisição contém os campos necessários
  if (!req.body ) {
    return res
      .status(400)
      .json({ message: "Nome, email e senha são obrigatórios." });
  }

  const { name, email, password } = req.body;

  if (!name || name.trim().length < 2) {
    return res
      .status(400)
      .json({ message: "Nome deve ter pelo menos 2 letras." });
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
  if (!password || password.length < 6) {
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
