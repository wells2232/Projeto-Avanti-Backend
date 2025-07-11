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
  const verificationUrl = `http://localhost:5173/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: `"App Name" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Verificação de Email",
    html: `<p>Clique <a href="${verificationUrl}">aqui</a> para verificar seu email.</p>`,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Email de verificação enviado para ${userEmail}`);
}

async function sendPasswordResetEmail(userEmail, userName, resetToken) {
  const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: `"App Name" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Redefinição de Senha",
    html: `<p>Olá, ${userName}! Clique <a href="${resetUrl}">aqui</a> para redefinir sua senha.</p>`,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Email de redefinição de senha enviado para ${userEmail}`);
}

async function sendAcceptedProposalEmail(userEmail, proposalDetails) {
  const mailOptions = {
    from: `"App Name" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Proposta Aceita",
    html: `<p>Boas Notícias! Sua proposta para o item ${proposalDetails.itemName} foi aceita.
    Entre em contato com ${proposalDetails.itemOwnerName} para combinar a troca</p>`,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Email de proposta aceita enviado para ${userEmail}`);
}

async function sendDeclinedProposalEmail(userEmail, proposalDetails) {
  const mailOptions = {
    from: `"App Name" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Proposta Recusada",
    html: `<p>Infelizmente, sua proposta para o item ${proposalDetails.itemName} foi recusada.</p>`,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Email de proposta recusada enviado para ${userEmail}`);
}

module.exports = {
  emailService: {
    sendVerificationEmail,
    sendPasswordResetEmail,
    sendAcceptedProposalEmail,
    sendDeclinedProposalEmail,
  },
};
