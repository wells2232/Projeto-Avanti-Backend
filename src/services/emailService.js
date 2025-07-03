const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendVerificationEmail(userEmail, verificationToken) {
  const verificationUrl = `http://localhost:3000/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: `"App Name" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Verificação de Email",
    html: `<p>Clique <a href="${verificationUrl}">aqui</a> para verificar seu email.</p>`,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Email de verificação enviado para ${userEmail}`);
}

module.exports = {
  emailService: {
    sendVerificationEmail,
  },
};
