-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `categoryId` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
