/*
  Warnings:

  - You are about to drop the column `type_anggaran` on the `anggaran` table. All the data in the column will be lost.
  - Added the required column `id_type_anggaran` to the `anggaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_type_anggaran` to the `jenis_anggaran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `anggaran` DROP COLUMN `type_anggaran`,
    ADD COLUMN `id_type_anggaran` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `jenis_anggaran` ADD COLUMN `id_type_anggaran` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `type_anggaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `type_anggaran_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `anggaran` ADD CONSTRAINT `anggaran_id_type_anggaran_fkey` FOREIGN KEY (`id_type_anggaran`) REFERENCES `type_anggaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jenis_anggaran` ADD CONSTRAINT `jenis_anggaran_id_type_anggaran_fkey` FOREIGN KEY (`id_type_anggaran`) REFERENCES `type_anggaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
