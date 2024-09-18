/*
  Warnings:

  - Added the required column `keterangan` to the `iuran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_iuran` to the `setor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nilai` to the `setor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `iuran` ADD COLUMN `keterangan` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `setor` ADD COLUMN `id_iuran` INTEGER NOT NULL,
    ADD COLUMN `nilai` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `setor` ADD CONSTRAINT `setor_id_iuran_fkey` FOREIGN KEY (`id_iuran`) REFERENCES `iuran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
