/*
  Warnings:

  - You are about to drop the column `id_photo_user` on the `user` table. All the data in the column will be lost.
  - Added the required column `id_user` to the `photo_user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_id_photo_user_fkey`;

-- DropIndex
DROP INDEX `user_id_photo_user_fkey` ON `user`;

-- AlterTable
ALTER TABLE `photo_user` ADD COLUMN `id_user` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `id_photo_user`;

-- AddForeignKey
ALTER TABLE `photo_user` ADD CONSTRAINT `photo_user_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
