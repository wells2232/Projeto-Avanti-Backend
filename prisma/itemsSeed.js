

const itemsToCreate = [
  {
    name: "Headphone Bluetooth Sony WH-1000XM4",
    description: "Pouco usado, em perfeito estado. Acompanha case original e todos os cabos. Cancelamento de ruído incrível, ideal para trabalho e viagens.",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/headphone_sony",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6", // Disponível
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["e9e9accf-b7af-4957-9b65-d7bffc026452"], // Eletrônicos
  },
  {
    name: "Box Trilogia O Senhor dos Anéis - J.R.R. Tolkien",
    description: "Edição de colecionador em capa dura, com mapas da Terra-média. Lidos apenas uma vez. Sem marcas ou orelhas nos livros.",
    imageUrl: "https://i.imgur.com/WdeV1P6.jpeg",
    imagePublicId: "placeholders/lotr_box",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["94c8a08f-15b6-4866-8630-4e44fe91f51e"], // Livros
  },
  {
    name: "Cadeira de Escritório Ergonômica",
    description: "Cadeira com ajuste de altura e lombar. O pistão de gás funciona perfeitamente, mas o tecido do braço direito tem um pequeno rasgo.",
    imageUrl: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=1587&auto=format&fit=crop",
    imagePublicId: "placeholders/office_chair",
    conditionId: "375ad59d-af68-42c7-88d3-2fba6bda27e5", // Com Defeitos
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["6bcf8a31-9076-4d6f-af86-a8eed3d62272"], // Móveis
  },
  {
    name: "Bicicleta Aro 29 Mountain Bike",
    description: "Quadro de alumínio, 21 marchas Shimano. Usada para trilhas leves, possui alguns arranhões normais de uso no quadro, mas a mecânica está em dia.",
    imageUrl: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=1887&auto=format&fit=crop",
    imagePublicId: "placeholders/mountain_bike",
    conditionId: "0500960e-d81e-40d7-9137-8d009b105253", // Usado - Bom Estado
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["77ac9b01-ba02-4083-8aff-7ec0490ff5b2"], // Esportes
  },
  {
    name: "Jaqueta de Couro Sintético Preta (Tamanho M)",
    description: "Jaqueta estilo rocker, nunca usada, ainda com etiqueta. Foi um presente que não serviu no meu tamanho.",
    imageUrl: "https://tse3.mm.bing.net/th/id/OIP.Z4wYCj7wmmeO2erdMTPWuwHaJA?rs=1&pid=ImgDetMain&o=7&rm=3",
    imagePublicId: "placeholders/leather_jacket",
    conditionId: "a1cf2bbf-eef2-4797-8765-8a79b2d6b429", // Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["96f7ae4f-d440-4177-9dcd-fcd47264e6e2"], // Roupas
  },
  {
    name: "Console Nintendo Switch",
    description: "Versão com Joy-Cons azul e vermelho. Acompanha dock, cabos e caixa original. Tela sem arranhões, sempre usado com película.",
    imageUrl: "https://images.unsplash.com/photo-1589254066213-a0c9dc853511?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/nintendo_switch",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["e9e9accf-b7af-4957-9b65-d7bffc026452", "65d03b9e-89fb-4aaa-8267-bdd0b5a9a057"], // Eletrônicos, Brinquedos
  },
  {
    name: "Tênis de Corrida Nike (Tam. 42)",
    description: "Modelo React Infinity Run. Usado por cerca de 50km. Solado em ótimo estado, sem desgastes significativos.",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/running_shoes",
    conditionId: "0500960e-d81e-40d7-9137-8d009b105253", // Usado - Bom Estado
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["77ac9b01-ba02-4083-8aff-7ec0490ff5b2", "96f7ae4f-d440-4177-9dcd-fcd47264e6e2"], // Esportes, Roupas
  },
  {
    name: "Smartphone Samsung Galaxy S21",
    description: "Usado por 6 meses, em ótimo estado. Acompanha capa, carregador original e caixa. Tela sem arranhões.",
    imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/samsung_galaxy_s21",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6", // Disponível
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["e9e9accf-b7af-4957-9b65-d7bffc026452"], // Eletrônicos
  },
  {
    name: "Livro '1984' - George Orwell",
    description: "Edição em português, capa mole. Lido uma vez, sem marcas ou anotações. Perfeito para fãs de distopia.",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4ebf0c?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/1984_book",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["94c8a08f-15b6-4866-8630-4e44fe91f51e"], // Livros
  },
  {
    name: "Mesa de Jantar de Madeira (6 Lugares)",
    description: "Mesa de madeira maciça, com algumas marcas de uso no tampo. Estrutura sólida, ideal para salas amplas.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/dining_table",
    conditionId: "0500960e-d81e-40d7-9137-8d009b105253", // Usado - Bom Estado
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["6bcf8a31-9076-4d6f-af86-a8eed3d62272"], // Móveis
  },
  {
    name: "Tênis Adidas Ultraboost (Tam. 40)",
    description: "Usado em corridas leves, solado com leve desgaste. Confortável, com amortecimento premium.",
    imageUrl: "https://images.unsplash.com/photo-1608231387042-66d17730565e?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/adidas_ultraboost",
    conditionId: "0500960e-d81e-40d7-9137-8d009b105253", // Usado - Bom Estado
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["77ac9b01-ba02-4083-8aff-7ec0490ff5b2", "96f7ae4f-d440-4177-9dcd-fcd47264e6e2"], // Esportes, Roupas
  },
  {
    name: "Câmera Canon EOS Rebel T7",
    description: "Câmera DSLR com lente 18-55mm. Pouco usada, perfeita para iniciantes em fotografia.",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc49?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/canon_eos_t7",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["e9e9accf-b7af-4957-9b65-d7bffc026452"], // Eletrônicos
  },
  {
    name: "Sofá de Canto 3 Lugares",
    description: "Sofá cinza com tecido suede. Pequena mancha no assento, mas em bom estado geral.",
    imageUrl: "https://images.unsplash.com/photo-1519961655809-11c7b12d1c77?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/corner_sofa",
    conditionId: "375ad59d-af68-42c7-88d3-2fba6bda27e5", // Com Defeitos
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["6bcf8a31-9076-4d6f-af86-a8eed3d62272"], // Móveis
  },
  {
    name: "Guitarra Elétrica Fender Stratocaster",
    description: "Modelo clássico, cor preta. Pouco usada, com pequenos arranhões na parte traseira.",
    imageUrl: "https://images.unsplash.com/photo-1510915361894-ffd88b690c1f?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/fender_stratocaster",
    conditionId: "0500960e-d81e-40d7-9137-8d009b105253", // Usado - Bom Estado
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["e9e9accf-b7af-4957-9b65-d7bffc026452"], // Eletrônicos
  },
  {
    name: "Vestido Floral (Tamanho P)",
    description: "Vestido novo, com etiqueta. Estilo boho, ideal para eventos casuais.",
    imageUrl: "https://images.unsplash.com/photo-1581006858190-d8b4064d6e4e?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/floral_dress",
    conditionId: "a1cf2bbf-eef2-4797-8765-8a79b2d6b429", // Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["96f7ae4f-d440-4177-9dcd-fcd47264e6e2"], // Roupas
  },
  {
    name: "Monitor LG 27' Full HD",
    description: "Monitor em excelente estado, usado para trabalho remoto. Acompanha cabos HDMI e base ajustável.",
    imageUrl: "https://images.unsplash.com/photo-1593642634367-dce0d4018b0f?q=80ouni=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/lg_monitor",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["e9e9accf-b7af-4957-9b65-d7bffc026452"], // Eletrônicos
  },
  {
    name: "Coleção Harry Potter (7 Livros)",
    description: "Edição em capa dura, lida apenas uma vez. Todos os livros em perfeito estado, com capa protetora.",
    imageUrl: "https://images.unsplash.com/photo-1600189261867-30e5ffe7d8a9?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/harry_potter_collection",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["94c8a08f-15b6-4866-8630-4e44fe91f51e"], // Livros
  },
  {
    name: "Patins Inline Rollerblade",
    description: "Tamanho 41, usado em passeios casuais. Rolamentos em bom estado, mas com alguns arranhões na carcaça.",
    imageUrl: "https://images.unsplash.com/photo-1596398793377-7e95924b3a3b?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/inline_skates",
    conditionId: "0500960e-d81e-40d7-9137-8d009b105253", // Usado - Bom Estado
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["77ac9b01-ba02-4083-8aff-7ec0490ff5b2"], // Esportes
  },
  {
    name: "Mochila de Couro (20L)",
    description: "Mochila preta, ideal para trabalho ou viagens. Novo, nunca usado, com etiquetas.",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/leather_backpack",
    conditionId: "a1cf2bbf-eef2-4797-8765-8a79b2d6b429", // Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["96f7ae4f-d440-4177-9dcd-fcd47264e6e2"], // Roupas
  },
  {
    name: "Impressora HP DeskJet",
    description: "Impressora multifuncional, usada poucas vezes. Acompanha cartuchos novos e cabo USB.",
    imageUrl: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/hp_printer",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["e9e9accf-b7af-4957-9b65-d7bffc026452"], // Eletrônicos
  },
  {
    name: "Tapete Persa 2x3m",
    description: "Tapete em bom estado, com cores vibrantes. Pequena mancha em um canto, mas não compromete a estética.",
    imageUrl: "https://images.unsplash.com/photo-1615529182904-7d6c6b2f5e5c?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/persian_rug",
    conditionId: "375ad59d-af68-42c7-88d3-2fba6bda27e5", // Com Defeitos
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["6bcf8a31-9076-4d6f-af86-a8eed3d62272"], // Móveis
  },
  {
    name: "Drone DJI Mini 2",
    description: "Drone compacto, usado poucas vezes. Inclui controle remoto e bateria extra. Perfeito para vídeos aéreos.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/dji_mini_2",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["e9e9accf-b7af-4957-9b65-d7bffc026452"], // Eletrônicos
  },
  {
    name: "Jaqueta Jeans Levi's (Tamanho G)",
    description: "Jaqueta clássica, usada poucas vezes. Sem rasgos ou manchas, em ótimo estado.",
    imageUrl: "https://images.unsplash.com/photo-1519337264682-2c8b195f6b6d?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/levis_jacket",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["96f7ae4f-d440-4177-9dcd-fcd47264e6e2"], // Roupas
  },
  {
    name: "Jogo de Tabuleiro Catan",
    description: "Jogo completo, com todas as peças e manual. Usado em poucas partidas, em ótimo estado.",
    imageUrl: "https://images.unsplash.com/photo-1611273426858-1c6a5d43b06b?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/catan_board_game",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["65d03b9e-89fb-4aaa-8267-bdd0b5a9a057"], // Brinquedos
  },
  {
    name: "Cafeteira Nespresso Vertuo",
    description: "Usada por 3 meses, em perfeito estado. Acompanha cápsulas de café e manual.",
    imageUrl: "https://images.unsplash.com/photo-1517474638877-9c7cbef60c87?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/nespresso_vertuo",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["e9e9accf-b7af-4957-9b65-d7bffc026452"], // Eletrônicos
  },
  {
    name: "Livro 'Sapiens' - Yuval Noah Harari",
    description: "Edição em capa mole, lido uma vez. Sem marcas ou anotações, como novo.",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4ebf0c?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/sapiens_book",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["94c8a08f-15b6-4866-8630-4e44fe91f51e"], // Livros
  },
  {
    name: "Prancha de Surf 6'2\"",
    description: "Prancha usada em poucas sessões. Pequenos arranhões na base, mas estruturalmente intacta.",
    imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/surfboard",
    conditionId: "0500960e-d81e-40d7-9137-8d009b105253", // Usado - Bom Estado
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["77ac9b01-ba02-4083-8aff-7ec0490ff5b2"], // Esportes
  },
  {
    name: "Relógio Smartwatch Garmin",
    description: "Relógio fitness, usado por 4 meses. Monitora frequência cardíaca e sono. Acompanha carregador.",
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/garmin_smartwatch",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["e9e9accf-b7af-4957-9b65-d7bffc026452"], // Eletrônicos
  },
  {
    name: "Cama de Casal Box",
    description: "Cama com baú, em bom estado. Pequena mancha no tecido, mas funcionalidade intacta.",
    imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/box_bed",
    conditionId: "375ad59d-af68-42c7-88d3-2fba6bda27e5", // Com Defeitos
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["6bcf8a31-9076-4d6f-af86-a8eed3d62272"], // Móveis
  },
  {
    name: "Camisa Social Hugo Boss (Tamanho M)",
    description: "Camisa branca, usada em dois eventos. Em perfeito estado, sem manchas ou rasgos.",
    imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/hugo_boss_shirt",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["96f7ae4f-d440-4177-9dcd-fcd47264e6e2"], // Roupas
  },
  {
    name: "Console PlayStation 4 Slim",
    description: "Console com 500GB, acompanha 1 controle e cabos. Usado, mas em ótimo estado, sem defeitos.",
    imageUrl: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/ps4_slim",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["e9e9accf-b7af-4957-9b65-d7bffc026452", "65d03b9e-89fb-4aaa-8267-bdd0b5a9a057"], // Eletrônicos, Brinquedos
  },
  {
    name: "Bicicleta Elétrica 350W",
    description: "Bicicleta com bateria nova, usada por 3 meses. Pequenos arranhões no quadro.",
    imageUrl: "https://images.unsplash.com/photo-1605009927737-831e7a5b2d0f?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/electric_bike",
    conditionId: "0500960e-d81e-40d7-9137-8d009b105253", // Usado - Bom Estado
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["77ac9b01-ba02-4083-8aff-7ec0490ff5b2"], // Esportes
  },
  {
    name: "Livro 'Duna' - Frank Herbert",
    description: "Edição de capa dura, lido uma vez. Sem marcas ou danos, como novo.",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4ebf0c?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/dune_book",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["94c8a08f-15b6-4866-8630-4e44fe91f51e"], // Livros
  },
  {
    name: "Fritadeira Air Fryer 4L",
    description: "Fritadeira usada por 6 meses, em perfeito funcionamento. Acompanha manual e cesto antiaderente.",
    imageUrl: "https://images.unsplash.com/photo-1611598639812-1db7a0a8c2d9?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/air_fryer",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["e9e9accf-b7af-4957-9b65-d7bffc026452"], // Eletrônicos
  },
  {
    name: "Mala de Viagem Samsonite (50L)",
    description: "Mala rígida, usada em duas viagens. Pequenos arranhões na superfície, mas rodas e zíperes em perfeito estado.",
    imageUrl: "https://images.unsplash.com/photo-1565023323300-1b2a3d1c3b5c?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/samsonite_suitcase",
    conditionId: "0500960e-d81e-40d7-9137-8d009b105253", // Usado - Bom Estado
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["96f7ae4f-d440-4177-9dcd-fcd47264e6e2"], // Roupas
  },
  {
    name: "Teclado Mecânico Razer",
    description: "Teclado com switches mecânicos, usado por 1 ano. Iluminação RGB funcionando perfeitamente.",
    imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/razer_keyboard",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["e9e9accf-b7af-4957-9b65-d7bffc026452"], // Eletrônicos
  },
  {
    name: "Raquete de Tênis Wilson",
    description: "Raquete usada em poucas partidas. Cordas em bom estado, mas com leves marcas no aro.",
    imageUrl: "https://images.unsplash.com/photo-1621317911080-f3f2591b6e4b?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/wilson_tennis_racket",
    conditionId: "0500960e-d81e-40d7-9137-8d009b105253", // Usado - Bom Estado
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["77ac9b01-ba02-4083-8aff-7ec0490ff5b2"], // Esportes
  },
  {
    name: "Espelho de Parede Decorativo",
    description: "Espelho redondo, 80cm de diâmetro. Pequena rachadura na moldura, mas não afeta o uso.",
    imageUrl: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1a2?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/decorative_mirror",
    conditionId: "375ad59d-af68-42c7-88d3-2fba6bda27e5", // Com Defeitos
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["6bcf8a31-9076-4d6f-af86-a8eed3d62272"], // Móveis
  },
  {
    name: "Fone de Ouvido JBL TWS",
    description: "Fones sem fio, usados por 3 meses. Bateria em ótimo estado, acompanha case de carregamento.",
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/jbl_tws",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["e9e9accf-b7af-4957-9b65-d7bffc026452"], // Eletrônicos
  },
  {
    name: "Calça Jeans Zara (Tamanho 38)",
    description: "Calça nova, com etiqueta. Modelo slim fit, cor azul escura.",
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/zara_jeans",
    conditionId: "a1cf2bbf-eef2-4797-8765-8a79b2d6b429", // Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["96f7ae4f-d440-4177-9dcd-fcd47264e6e2"], // Roupas
  },
  {
    name: "Livro 'O Pequeno Príncipe' - Antoine de Saint-Exupéry",
    description: "Edição ilustrada, em capa dura. Lido uma vez, sem marcas ou danos.",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4ebf0c?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/little_prince_book",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["94c8a08f-15b6-4866-8630-4e44fe91f51e"], // Livros
  },
  {
    name: "Bola de Futebol Adidas",
    description: "Bola oficial, usada em poucos jogos. Em bom estado, sem rasgos ou desgaste significativo.",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-4113f0d00569?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/adidas_soccer_ball",
    conditionId: "0500960e-d81e-40d7-9137-8d009b105253", // Usado - Bom Estado
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["77ac9b01-ba02-4083-8aff-7ec0490ff5b2"], // Esportes
  },
  {
    name: "Máquina de Costura Singer",
    description: "Máquina portátil, usada em poucos projetos. Funciona perfeitamente, acompanha acessórios.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/singer_sewing_machine",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["e9e9accf-b7af-4957-9b65-d7bffc026452"], // Eletrônicos
  },
  {
    name: "Cadeira de Balanço de Madeira",
    description: "Cadeira rústica, com algumas marcas de uso no assento. Estrutura sólida e confortável.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/rocking_chair",
    conditionId: "0500960e-d81e-40d7-9137-8d009b105253", // Usado - Bom Estado
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["6bcf8a31-9076-4d6f-af86-a8eed3d62272"], // Móveis
  },
  {
    name: "Smart TV Samsung 43' 4K",
    description: "TV em perfeito estado, usada por 1 ano. Acompanha controle remoto e suporte de parede.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/samsung_tv",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["e9e9accf-b7af-4957-9b65-d7bffc026452"], // Eletrônicos
  },
  {
    name: "Jaqueta de Inverno North Face (Tamanho L)",
    description: "Jaqueta impermeável, usada em uma viagem. Em ótimo estado, sem rasgos ou manchas.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/north_face_jacket",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["96f7ae4f-d440-4177-9dcd-fcd47264e6e2"], // Roupas
  },
  {
    name: "Livro 'A Arte da Guerra' - Sun Tzu",
    description: "Edição de bolso, lido uma vez. Sem marcas ou danos, como novo.",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4ebf0c?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/art_of_war_book",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["94c8a08f-15b6-4866-8630-4e44fe91f51e"], // Livros
  },
  {
    name: "Bola de Basquete Spalding",
    description: "Bola oficial, usada em poucos jogos. Em bom estado, com boa aderência.",
    imageUrl: "https://images.unsplash.com/photo-1546519638-7e78a986f07e?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/spalding_basketball",
    conditionId: "0500960e-d81e-40d7-9137-8d009b105253", // Usado - Bom Estado
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["77ac9b01-ba02-4083-8aff-7ec0490ff5b2"], // Esportes
  },
  {
    name: "Luminária de Mesa LED",
    description: "Luminária com ajuste de intensidade, usada por 6 meses. Funciona perfeitamente, acompanha carregador.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/led_desk_lamp",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["e9e9accf-b7af-4957-9b65-d7bffc026452"], // Eletrônicos
  },
  {
    name: "Estante de Livros de Madeira",
    description: "Estante com 5 prateleiras, com pequenas marcas de uso. Estrutura firme, ideal para livros ou decoração.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/wooden_bookshelf",
    conditionId: "0500960e-d81e-40d7-9137-8d009b105253", // Usado - Bom Estado
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["6bcf8a31-9076-4d6f-af86-a8eed3d62272"], // Móveis
  },
  {
    name: "Smartphone iPhone 12",
    description: "Usado por 8 meses, em ótimo estado. Tela sem arranhões, acompanha carregador e capa.",
    imageUrl: "https://images.unsplash.com/photo-1607936854279-45669dde3b3b?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/iphone_12",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["e9e9accf-b7af-4957-9b65-d7bffc026452"], // Eletrônicos
  },
  {
    name: "Calça de Alfaiataria (Tamanho 42)",
    description: "Calça preta, usada em eventos formais. Em perfeito estado, sem manchas ou rasgos.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/tailored_pants",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["96f7ae4f-d440-4177-9dcd-fcd47264e6e2"], // Roupas
  },
  {
    name: "Livro 'Orgulho e Preconceito' - Jane Austen",
    description: "Edição em capa mole, lido uma vez. Sem marcas ou danos, como novo.",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4ebf0c?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/pride_prejudice_book",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["94c8a08f-15b6-4866-8630-4e44fe91f51e"], // Livros
  },
  {
    name: "Chuteira Nike Mercurial (Tam. 41)",
    description: "Chuteira usada em poucos jogos. Solado com leve desgaste, mas em bom estado geral.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/nike_mercurial",
    conditionId: "0500960e-d81e-40d7-9137-8d009b105253", // Usado - Bom Estado
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["77ac9b01-ba02-4083-8aff-7ec0490ff5b2", "96f7ae4f-d440-4177-9dcd-fcd47264e6e2"], // Esportes, Roupas
  },
  {
    name: "Caixa de Som Bluetooth JBL",
    description: "Caixa portátil, usada em poucas ocasiões. Bateria e som em perfeito estado.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1740&auto=format&fit=crop",
    imagePublicId: "placeholders/jbl_speaker",
    conditionId: "3c6b4260-4dc3-49f8-b8f4-aa40994d1549", // Usado - Como Novo
    statusId: "bf97f3eb-3c9b-4f43-84f5-66a5ee277bb6",
    userId: "2a0454c1-3f6d-4b27-bedc-25c51dd32ca7",
    categories: ["e9e9accf-b7af-4957-9b65-d7bffc026452"], // Eletrônicos
  }
];

module.exports = {
  itemsToCreate
};