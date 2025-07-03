require("dotenv").config();
const { Worker } = require("bullmq");
const { redisConnection } = require("./src/config/queue");
const { emailService } = require("./src/services/emailService");

console.log("🚀 Worker de e-mail iniciado. Aguardando por tarefas...");

const worker = new Worker(
  "email-queue",
  async (job) => {
    console.log(`Processando job #${job.id} - ${job.name}`);
    const { userEmail, verificationToken } = job.data;

    try {
      await emailService.sendVerificationEmail(userEmail, verificationToken);
      console.log(
        `Job ${job.id} concluído com sucesso: Email enviado para ${userEmail}`
      );
    } catch (error) {
      console.error(`Job ${job.id} falhou`, error);
      throw error;
    }
  },
  {
    connection: redisConnection,
  }
);

worker.on("completed", (job) => {
  console.log(`[LOG] Job ${job.id} concluído com sucesso`);
});

worker.on("failed", (job, err) => {
  console.error(`[LOG] Job ${job.id} falhou: ${err.message}`);
});
