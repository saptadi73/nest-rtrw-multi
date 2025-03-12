/*
  Warnings:

  - You are about to drop the column `id_kk` on the `photo_kk` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "photo_kk" DROP CONSTRAINT "photo_kk_id_kk_fkey";

-- AlterTable
ALTER TABLE "kk" ADD COLUMN     "id_photo_kk" INTEGER;

-- AlterTable
ALTER TABLE "photo_kk" DROP COLUMN "id_kk";

-- AddForeignKey
ALTER TABLE "kk" ADD CONSTRAINT "kk_id_photo_kk_fkey" FOREIGN KEY ("id_photo_kk") REFERENCES "photo_kk"("id") ON DELETE SET NULL ON UPDATE CASCADE;
