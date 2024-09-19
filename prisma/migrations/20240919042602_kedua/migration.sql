/*
  Warnings:

  - Added the required column `nama` to the `iuran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `biaya` ADD COLUMN `biaya` INTEGER NULL;

-- AlterTable
ALTER TABLE `iuran` ADD COLUMN `nama` VARCHAR(191) NOT NULL,
    MODIFY `iuran` INTEGER NULL,
    MODIFY `keterangan` VARCHAR(191) NULL;
