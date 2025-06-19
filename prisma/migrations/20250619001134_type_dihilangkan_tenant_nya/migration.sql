/*
  Warnings:

  - You are about to drop the column `id_tenant` on the `type` table. All the data in the column will be lost.
  - You are about to drop the column `id_tenant` on the `type_anggaran` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "type" DROP CONSTRAINT "type_id_tenant_fkey";

-- DropForeignKey
ALTER TABLE "type_anggaran" DROP CONSTRAINT "type_anggaran_id_tenant_fkey";

-- AlterTable
ALTER TABLE "type" DROP COLUMN "id_tenant";

-- AlterTable
ALTER TABLE "type_anggaran" DROP COLUMN "id_tenant";
