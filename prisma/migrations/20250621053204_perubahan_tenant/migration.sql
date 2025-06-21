/*
  Warnings:

  - A unique constraint covering the columns `[nama]` on the table `tenant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tenant" ADD COLUMN     "no_hp" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "tenant_nama_key" ON "tenant"("nama");
