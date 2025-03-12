/*
  Warnings:

  - You are about to drop the column `id_warga` on the `photo_warga` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "photo_warga" DROP CONSTRAINT "photo_warga_id_warga_fkey";

-- AlterTable
ALTER TABLE "photo_warga" DROP COLUMN "id_warga";

-- AlterTable
ALTER TABLE "warga" ADD COLUMN     "id_photo_warga" INTEGER;

-- AddForeignKey
ALTER TABLE "warga" ADD CONSTRAINT "warga_id_photo_warga_fkey" FOREIGN KEY ("id_photo_warga") REFERENCES "photo_warga"("id") ON DELETE SET NULL ON UPDATE CASCADE;
