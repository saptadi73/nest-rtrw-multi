/*
  Warnings:

  - You are about to drop the column `id_kk` on the `filekeluarga` table. All the data in the column will be lost.
  - You are about to drop the column `id_photo_kk` on the `kk` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "filekeluarga" DROP CONSTRAINT "filekeluarga_id_kk_fkey";

-- DropForeignKey
ALTER TABLE "kk" DROP CONSTRAINT "kk_id_photo_kk_fkey";

-- AlterTable
ALTER TABLE "filekeluarga" DROP COLUMN "id_kk";

-- AlterTable
ALTER TABLE "kk" DROP COLUMN "id_photo_kk",
ADD COLUMN     "id_filekeluarga" INTEGER;

-- AddForeignKey
ALTER TABLE "kk" ADD CONSTRAINT "kk_id_filekeluarga_fkey" FOREIGN KEY ("id_filekeluarga") REFERENCES "filekeluarga"("id") ON DELETE SET NULL ON UPDATE CASCADE;
