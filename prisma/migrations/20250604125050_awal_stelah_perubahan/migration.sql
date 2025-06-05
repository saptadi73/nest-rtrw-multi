/*
  Warnings:

  - You are about to drop the column `id_anggaran` on the `bukti` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `photo_user` table. All the data in the column will be lost.
  - You are about to drop the `token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bukti" DROP CONSTRAINT "bukti_id_anggaran_fkey";

-- DropForeignKey
ALTER TABLE "photo_user" DROP CONSTRAINT "photo_user_id_user_fkey";

-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_id_user_fkey";

-- AlterTable
ALTER TABLE "anggaran" ADD COLUMN     "id_bukti" INTEGER;

-- AlterTable
ALTER TABLE "bukti" DROP COLUMN "id_anggaran";

-- AlterTable
ALTER TABLE "photo_user" DROP COLUMN "id_user";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "id_photo_user" INTEGER;

-- DropTable
DROP TABLE "token";

-- AddForeignKey
ALTER TABLE "anggaran" ADD CONSTRAINT "anggaran_id_bukti_fkey" FOREIGN KEY ("id_bukti") REFERENCES "bukti"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_photo_user_fkey" FOREIGN KEY ("id_photo_user") REFERENCES "photo_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
