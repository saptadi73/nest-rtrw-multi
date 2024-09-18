-- AlterTable
ALTER TABLE `warga` ADD COLUMN `jenis_kelamin` BOOLEAN NULL DEFAULT true;

-- CreateTable
CREATE TABLE `pengeluaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `id_kk` INTEGER NOT NULL,
    `nilai` INTEGER NOT NULL,
    `id_biaya` INTEGER NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `biaya` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `jenis_biaya` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pengeluaran` ADD CONSTRAINT `pengeluaran_id_kk_fkey` FOREIGN KEY (`id_kk`) REFERENCES `kk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengeluaran` ADD CONSTRAINT `pengeluaran_id_biaya_fkey` FOREIGN KEY (`id_biaya`) REFERENCES `biaya`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
