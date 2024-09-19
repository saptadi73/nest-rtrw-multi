-- CreateTable
CREATE TABLE `kk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `no_kk` VARCHAR(191) NOT NULL,
    `no_blok` INTEGER NOT NULL,
    `no_rumah` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `warga` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `id_type` INTEGER NOT NULL,
    `id_kk` INTEGER NULL,
    `nik` VARCHAR(191) NULL,
    `jenis_kelamin` BOOLEAN NULL DEFAULT true,
    `tempat_lahir` VARCHAR(191) NULL,
    `tanggal_lahir` DATETIME(3) NULL,
    `no_hp` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `iuran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `iuran` INTEGER NOT NULL,
    `keterangan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `setor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `id_kk` INTEGER NOT NULL,
    `nilai` INTEGER NOT NULL,
    `id_iuran` INTEGER NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hutang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `id_kk` INTEGER NOT NULL,
    `nilai` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
CREATE TABLE `anggaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `id_warga` INTEGER NOT NULL,
    `nilai` INTEGER NOT NULL,
    `id_jenis_anggaran` INTEGER NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `biaya` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jenis_anggaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `photo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NULL,
    `url` VARCHAR(191) NOT NULL,
    `id_warga` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bukti` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NULL,
    `url` VARCHAR(191) NOT NULL,
    `id_anggaran` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `warga` ADD CONSTRAINT `warga_id_type_fkey` FOREIGN KEY (`id_type`) REFERENCES `type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `warga` ADD CONSTRAINT `warga_id_kk_fkey` FOREIGN KEY (`id_kk`) REFERENCES `kk`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `setor` ADD CONSTRAINT `setor_id_kk_fkey` FOREIGN KEY (`id_kk`) REFERENCES `kk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `setor` ADD CONSTRAINT `setor_id_iuran_fkey` FOREIGN KEY (`id_iuran`) REFERENCES `iuran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hutang` ADD CONSTRAINT `hutang_id_kk_fkey` FOREIGN KEY (`id_kk`) REFERENCES `kk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengeluaran` ADD CONSTRAINT `pengeluaran_id_kk_fkey` FOREIGN KEY (`id_kk`) REFERENCES `kk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengeluaran` ADD CONSTRAINT `pengeluaran_id_biaya_fkey` FOREIGN KEY (`id_biaya`) REFERENCES `biaya`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `anggaran` ADD CONSTRAINT `anggaran_id_warga_fkey` FOREIGN KEY (`id_warga`) REFERENCES `warga`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `anggaran` ADD CONSTRAINT `anggaran_id_jenis_anggaran_fkey` FOREIGN KEY (`id_jenis_anggaran`) REFERENCES `jenis_anggaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `photo` ADD CONSTRAINT `photo_id_warga_fkey` FOREIGN KEY (`id_warga`) REFERENCES `warga`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bukti` ADD CONSTRAINT `bukti_id_anggaran_fkey` FOREIGN KEY (`id_anggaran`) REFERENCES `anggaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
