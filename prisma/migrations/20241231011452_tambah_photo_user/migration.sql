-- AlterTable
ALTER TABLE `user` ADD COLUMN `id_photo_user` INTEGER NULL;

-- CreateTable
CREATE TABLE `photo_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NULL,
    `url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `photo_user_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_id_photo_user_fkey` FOREIGN KEY (`id_photo_user`) REFERENCES `photo_user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
