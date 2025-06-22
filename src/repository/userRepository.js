const prisma = require("../lib/prisma");

async function findAllUsers() {
  return await prisma.users.findMany();
}

async function findUserByEmail(email) {
  return await prisma.users.findUnique({
    where: {
      email: email,
    },
  });
}

async function create(userData) {
  return await prisma.users.create({
    data: userData,
  });
}

module.exports = {
  findAllUsers,
  findUserByEmail,
  create,
};
