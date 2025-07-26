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

async function findUserById(id) {
  return await prisma.users.findUnique({
    where: {
      id: id,
    },
  });
}

async function create(userData) {
  return await prisma.users.create({
    data: userData,
  });
}

async function update(id, userData) {
  return await prisma.users.update({
    where: {
      id: id,
    },
    data: {
      email: userData.email,
      name: userData.name,
      city: userData.city,
      state: userData.state,
    }
  });
}

module.exports = {
  findAllUsers,
  findUserByEmail,
  findUserById,
  create,
  update,
};
