const { Queue } = require("bullmq");

const redisConnection = {
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
};

const emailQueue = new Queue("email-queue", {
  connection: redisConnection,
});

module.exports = {
  emailQueue,
  redisConnection,
};
