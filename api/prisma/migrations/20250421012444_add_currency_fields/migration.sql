-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_categoryId_fkey`;

-- DropIndex
DROP INDEX `Transaction_categoryId_fkey` ON `Transaction`;

-- AlterTable
ALTER TABLE `Transaction` MODIFY `categoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
