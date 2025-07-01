const { hash } = require("bcryptjs");
const { Role } = require("@prisma/client");
const prisma = require("../src/lib/prisma");

async function main() {
  console.log("Iniciando o processo de seeding...");

  // --- Criar o Usuário Administrador ---
  const adminPassword = await hash("123456", 10); // Use uma senha segura e guarde em um .env
  const admin = await prisma.users.upsert({
    where: { email: "wellington@gmail.com" },
    update: {},
    create: {
      email: "wellington@gmail.com",
      name: "Wellington - ADMIN",
      password: adminPassword,
      role: Role.ADMIN, // Definindo o perfil como ADMIN
    },
  });
  console.log(`Usuário Admin criado/encontrado: ${admin.email}`);

  // --- Criar ItemConditions ---
  const conditions = [
    "Novo",
    "Usado - Como Novo",
    "Usado - Bom Estado",
    "Com Defeitos",
  ];
  for (const condition of conditions) {
    await prisma.itemConditions.upsert({
      where: { condition },
      update: {},
      create: { condition },
    });
  }
  console.log("Condições de Itens criadas.");

  // --- Criar ItemStatuses ---
  const itemStatuses = ["Disponível", "Reservado", "Trocado"];
  for (const status of itemStatuses) {
    await prisma.itemStatuses.upsert({
      where: { status_name: status },
      update: {},
      create: { status_name: status },
    });
  }
  console.log("Status de Itens criados.");

  // --- Criar ProposalStatuses ---
  const proposalStatuses = ["Pendente", "Aceita", "Recusada", "Cancelada"];
  for (const status of proposalStatuses) {
    await prisma.proposalStatuses.upsert({
      where: { status_name: status },
      update: {},
      create: { status_name: status },
    });
  }
  console.log("Status de Propostas criados.");

  // --- Criar Categorias Iniciais ---
  const categories = [
    "Eletrônicos",
    "Móveis",
    "Livros",
    "Roupas",
    "Brinquedos",
    "Esportes",
  ];
  for (const category of categories) {
    await prisma.category.upsert({
      where: { category_name: category },
      update: {},
      create: { category_name: category },
    });
  }
  console.log("Categorias criadas.");

  console.log("Seeding finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
