-- CreateTable
CREATE TABLE "Items" (
    "id" UUID NOT NULL,
    "item_name" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "exchange_preferences" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,
    "statusId" UUID NOT NULL,
    "conditionId" UUID NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemStatuses" (
    "id" UUID NOT NULL,
    "status_name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ItemStatuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemConditions" (
    "id" UUID NOT NULL,
    "condition" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ItemConditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" UUID NOT NULL,
    "category_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemCategory" (
    "id" UUID NOT NULL,
    "itemId" UUID NOT NULL,
    "categoriesId" UUID NOT NULL,

    CONSTRAINT "ItemCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposal" (
    "id" UUID NOT NULL,
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "proposerId" UUID NOT NULL,
    "targerItemId" UUID NOT NULL,
    "statusId" UUID NOT NULL,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProposalOfferedItems" (
    "id" UUID NOT NULL,
    "proposalId" UUID NOT NULL,
    "itemId" UUID NOT NULL,

    CONSTRAINT "ProposalOfferedItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProposalStatuses" (
    "id" UUID NOT NULL,
    "status_name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ProposalStatuses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemStatuses_status_name_key" ON "ItemStatuses"("status_name");

-- CreateIndex
CREATE UNIQUE INDEX "ItemConditions_condition_key" ON "ItemConditions"("condition");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_category_name_key" ON "Categories"("category_name");

-- CreateIndex
CREATE UNIQUE INDEX "ItemCategory_itemId_categoriesId_key" ON "ItemCategory"("itemId", "categoriesId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProposalOfferedItems_proposalId_itemId_key" ON "ProposalOfferedItems"("proposalId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "ProposalStatuses_status_name_key" ON "ProposalStatuses"("status_name");

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "ItemStatuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "ItemConditions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCategory" ADD CONSTRAINT "ItemCategory_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCategory" ADD CONSTRAINT "ItemCategory_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_proposerId_fkey" FOREIGN KEY ("proposerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_targerItemId_fkey" FOREIGN KEY ("targerItemId") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "ProposalStatuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProposalOfferedItems" ADD CONSTRAINT "ProposalOfferedItems_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
