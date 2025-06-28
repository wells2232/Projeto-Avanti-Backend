const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configura o SDK do Cloudinary com as suas credenciais do .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configura o motor de armazenamento do Multer para o Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "trade-app-items", // Nome da pasta no Cloudinary onde as imagens serão salvas
    allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"], // Formatos permitidos
    // 'public_id' é como o Cloudinary nomeia o arquivo
    public_id: (req, file) => {
      const fileName = `${new Date().getTime()}-${file.originalname}`;
      return fileName;
    },
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5MB por arquivo
  },
});

module.exports = upload;
