/*
  Warnings:

  - Added the required column `id_tenant` to the `anggaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tenant` to the `blok` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tenant` to the `bukti` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tenant` to the `entity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tenant` to the `filekeluarga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tenant` to the `filewarga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tenant` to the `gps_location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tenant` to the `iuran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tenant` to the `jenis_anggaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tenant` to the `kk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tenant` to the `pekerjaan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tenant` to the `photo_kk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tenant` to the `photo_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tenant` to the `photo_warga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tenant` to the `polygon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tenant` to the `setor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tenant` to the `status_warga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tenant` to the `trail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tenant` to the `type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tenant` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tenant` to the `warga` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "anggaran" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "blok" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "bukti" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "entity" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "filekeluarga" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "filewarga" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "gps_location" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "iuran" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "jenis_anggaran" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "kk" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pekerjaan" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "photo_kk" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "photo_user" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "photo_warga" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "polygon" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "setor" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "status_warga" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "trail" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "type" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "warga" ADD COLUMN     "id_tenant" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "tenant" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "kk" ADD CONSTRAINT "kk_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trail" ADD CONSTRAINT "trail_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blok" ADD CONSTRAINT "blok_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entity" ADD CONSTRAINT "entity_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "polygon" ADD CONSTRAINT "polygon_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gps_location" ADD CONSTRAINT "gps_location_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "warga" ADD CONSTRAINT "warga_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "status_warga" ADD CONSTRAINT "status_warga_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pekerjaan" ADD CONSTRAINT "pekerjaan_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "type" ADD CONSTRAINT "type_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "iuran" ADD CONSTRAINT "iuran_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "setor" ADD CONSTRAINT "setor_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anggaran" ADD CONSTRAINT "anggaran_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jenis_anggaran" ADD CONSTRAINT "jenis_anggaran_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo_warga" ADD CONSTRAINT "photo_warga_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bukti" ADD CONSTRAINT "bukti_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filekeluarga" ADD CONSTRAINT "filekeluarga_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filewarga" ADD CONSTRAINT "filewarga_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo_user" ADD CONSTRAINT "photo_user_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo_kk" ADD CONSTRAINT "photo_kk_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
