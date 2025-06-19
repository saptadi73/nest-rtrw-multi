/*
  Warnings:

  - Added the required column `id_tenant` to the `type_anggaran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "type_anggaran" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "type_anggaran" ADD CONSTRAINT "type_anggaran_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
