const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando o processo de seeding...");

  // Inserindo dados na tabela 'conditions'
  await prisma.itemConditions.createMany({
    data: [
      {
        condition: "Novo",
        description: "Item nunca usado, na embalagem original.",
      },
      {
        condition: "Semi-novo",
        description: "Item usado poucas vezes, sem marcas de uso.",
      },
      {
        condition: "Usado",
        description: "Item com marcas de uso visíveis, mas funcional.",
      },
    ],
    skipDuplicates: true, // Ignora se os dados já existirem
  });

  // Inserindo dados na tabela 'statuses'
  await prisma.itemStatuses.createMany({
    data: [
      {
        status_name: "Disponível",
        description: "O item está aberto para receber propostas.",
      },
      {
        status_name: "Em negociação",
        description: "O item tem uma proposta em andamento.",
      },
      { status_name: "Trocado", description: "O item já foi trocado." },
    ],
    skipDuplicates: true,
  });

  await prisma.proposalStatuses.createMany({
    data: [
      {
        status_name: "Pendente",
        description: "Proposta pendente de resposta.",
      },
      { status_name: "Aceita", description: "Proposta aceita pelo usuário." },
      {
        status_name: "Recusada",
        description: "Proposta recusada pelo usuário.",
      },
    ],
    skipDuplicates: true,
  });

  // Inserindo algumas categorias de exemplo
  await prisma.category.createMany({
    data: [
      { category_name: "Eletrônicos" },
      { category_name: "Livros" },
      { category_name: "Vestuário" },
      { category_name: "Móveis" },
      { category_name: "Jogos" },
    ],
    skipDuplicates: true,
  });

  console.log("Seeding concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
