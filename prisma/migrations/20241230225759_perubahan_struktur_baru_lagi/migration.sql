/*
  Warnings:

  - You are about to drop the `biaya` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hutang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pengeluaran` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `hutang` DROP FOREIGN KEY `hutang_id_kk_fkey`;

-- DropForeignKey
ALTER TABLE `pengeluaran` DROP FOREIGN KEY `pengeluaran_id_biaya_fkey`;

-- DropForeignKey
ALTER TABLE `pengeluaran` DROP FOREIGN KEY `pengeluaran_id_kk_fkey`;

-- DropTable
DROP TABLE `biaya`;

-- DropTable
DROP TABLE `hutang`;

-- DropTable
DROP TABLE `pengeluaran`;
