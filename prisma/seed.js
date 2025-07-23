const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const { default: slugify } = require('slugify');
const { itemsToCreate } = require('./itemsSeed');

// --- 1. DEFINIÇÃO DE TODOS OS DADOS ESTÁTICOS ---

const userId = "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7";

const categories = [
  { id: "65d03b9e-89fb-4aaa-8267-bdd0b5a9a057", name: "Brinquedos", slug: slugify("Brinquedos", { lower: true }) },
  { id: "6bcf8a31-9076-4d6f-af86-a8eed3d62272", name: "Móveis", slug: slugify("Móveis", { lower: true }) },
  { id: "77ac9b01-ba02-4083-8aff-7ec0490ff5b2", name: "Esportes", slug: slugify("Esportes", { lower: true }) },
  { id: "94c8a08f-15b6-4866-8630-4e44fe91f51e", name: "Livros", slug: slugify("Livros", { lower: true }) },
  { id: "96f7ae4f-d440-4177-9dcd-fcd47264e6e2", name: "Roupas", slug: slugify("Roupas", { lower: true }) },
  { id: "e9e9accf-b7af-4957-9b65-d7bffc026452", name: "Eletrônicos", slug: slugify("Eletrônicos", { lower: true }) },
];

const conditions = [
  { id: "0500960e-d81e-40d7-9137-8d009b105253", name: "Usado - Bom Estado", slug: slugify("Usado - Bom Estado", { lower: true }) },
  { id: "375ad59d-af68-42c7-88d3-2fba6bda27e5", name: "Com Defeitos" , slug: slugify("Com Defeitos", { lower: true }) },
  { id: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", name: "Usado - Como Novo", slug: slugify("Usado - Como Novo", { lower: true }) },
  { id: "a1cf2bbf-eef2-4797-8765-8a79b2d6b429", name: "Novo" , slug: slugify("Novo", { lower: true }) },
];

const statuses = [
    { id: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6", name: "Disponível", slug: slugify("Disponível", { lower: true }) },
    { id: "d1f3c5b2-8e4a-4c6b-9f0e-7d8f3c5b2e4a", name: "Em negociação", slug: slugify("Em negociação", { lower: true }) },
    { id: "e9c3795b-1631-4029-b2d4-d1efd16d1883", name: "Trocado", slug: slugify("Trocado", { lower: true }) },
];

// --- 2. FUNÇÃO PARA CRIAR ITENS ---



// --- 3. FUNÇÃO PRINCIPAL DO SEED ---
async function main() {
  console.log('Iniciando o processo de seed...');
  

     // Limpa os dados de itens para evitar duplicatas a cada execução
  console.log('Limpando dados de itens existentes...');
  await prisma.itemCategory.deleteMany({});
  await prisma.items.deleteMany({});
  //await prisma.category.deleteMany({});
  
  // Cria o usuário (se não existir)
  console.log('Criando usuário de teste...');
  await prisma.users.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      name: 'Wellington',
      email: 'wellington.nunes10@hotmail.com',
      password: bcrypt.hashSync('223240', 10), // Lembre-se de hashear senhas reais
      city: 'São José dos Campos',
      state: 'SP',
    },
  });

  // Cria as categorias
  console.log('Criando categorias...');
  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: { name: category.name },
      create: category,
    });
  }

  // Cria as condições
  console.log('Criando condições...');
  for (const condition of conditions) {
    await prisma.itemConditions.upsert({
      where: { name: condition.name },
      update: {},
      create: condition,
    });
  }

  // Cria os status
  console.log('Criando status...');
  for (const status of statuses) {
    await prisma.itemStatuses.upsert({
      where: { name: status.name },
      update: {},
      create: status,
    });
  }

  // Finalmente, cria os itens
  console.log('Criando novos itens...');
  for (const item of itemsToCreate) {
    await prisma.items.create({
      data: {
        item_name: item.name,
        description: item.description,
        image_url: item.imageUrl,
        image_public_id: item.imagePublicId,
        conditionId: item.conditionId,
        statusId: item.statusId,
        userId: item.userId,
        categories: {
          create: item.categories.map(catId => ({
            category: {
              connect: {
                id: catId,
              },
            },
          })),
        },
      },
    });
    console.log(`Item criado: ${item.name}`);
  }

  console.log('Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });