require("dotenv").config();
const { Worker } = require("bullmq");
const { redisConnection } = require("./src/config/queue");
const { emailService } = require("./src/services/emailService");

console.log("🚀 Worker de e-mail iniciado. Aguardando por tarefas...");

const worker = new Worker(
  "email-queue",
  async (job) => {
    console.log(`Processando job #${job.id} - ${job.name}`);

    switch (job.name) {
      case "send-verification-email": {
        const { userEmail, verificationToken } = job.data;
        await emailService.sendVerificationEmail(userEmail, verificationToken);
        console.log("Enviando email de verificação...");
        return;
      }
      case "password-reset": {
        const { userEmail, userName, resetToken } = job.data;
        await emailService.sendPasswordResetEmail(
          userEmail,
          userName,
          resetToken
        );
        console.log("Enviando email de redefinição de senha...");
        return;
      }
      case "sendProposalAcceptedEmail": {
        const { userEmail, proposalDetails } = job.data;
        await emailService.sendAcceptedProposalEmail(
          userEmail,
          proposalDetails
        );
        console.log("Enviando email de proposta aceita...");
        return;
      }
      case "sendProposalDeclinedEmail": {
        const { userEmail, proposalDetails } = job.data;
        await emailService.sendDeclinedProposalEmail(
          userEmail,
          proposalDetails
        );
        console.log("Enviando email de proposta recusada...");
        return;
      }
      case "sendProposalReceived": {
        const { userEmail, proposalDetails } = job.data;
        await emailService.sendProposalReceivedEmail(
          userEmail,
          proposalDetails
        );
        console.log("Enviando email de proposta recebida...");
        return;
      }
      default:
        throw new Error(`Job desconhecido: ${job.name}`);
    }
  },
  { connection: redisConnection }
);

worker.on("completed", (job) => {
  console.log(`[LOG] Job ${job.id} concluído com sucesso`);
});

worker.on("failed", (job, err) => {
  console.error(`[LOG] Job ${job.id} falhou: ${err.message}`);
});
