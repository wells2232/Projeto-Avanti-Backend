require("dotenv").config();
const app = require("./app").app; // Importa o app do arquivo app.js

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app };
