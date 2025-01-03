/*
  Warnings:

  - You are about to drop the column `no_blok` on the `kk` table. All the data in the column will be lost.
  - Added the required column `id_blok` to the `kk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "kk" DROP COLUMN "no_blok",
ADD COLUMN     "id_blok" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "blok" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "blok" TEXT NOT NULL,

    CONSTRAINT "blok_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blok_uuid_key" ON "blok"("uuid");

-- AddForeignKey
ALTER TABLE "kk" ADD CONSTRAINT "kk_id_blok_fkey" FOREIGN KEY ("id_blok") REFERENCES "blok"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
