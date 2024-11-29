-- CreateTable
CREATE TABLE `filekeluarga` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NULL,
    `url` VARCHAR(191) NOT NULL,
    `id_kk` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `filewarga` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NULL,
    `id_warga` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `filekeluarga` ADD CONSTRAINT `filekeluarga_id_kk_fkey` FOREIGN KEY (`id_kk`) REFERENCES `kk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `filewarga` ADD CONSTRAINT `filewarga_id_warga_fkey` FOREIGN KEY (`id_warga`) REFERENCES `warga`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
