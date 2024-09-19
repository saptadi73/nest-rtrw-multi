/*
  Warnings:

  - Added the required column `type_anggaran` to the `anggaran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `anggaran` ADD COLUMN `keterangan` VARCHAR(191) NULL,
    ADD COLUMN `type_anggaran` BOOLEAN NOT NULL;
