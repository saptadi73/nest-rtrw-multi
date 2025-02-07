-- AlterTable
ALTER TABLE "warga" ADD COLUMN     "id_pekerjaan" INTEGER,
ADD COLUMN     "id_status_warga" INTEGER;

-- CreateTable
CREATE TABLE "status_warga" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "status_warga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pekerjaan" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "pekerjaan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "status_warga_uuid_key" ON "status_warga"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "pekerjaan_uuid_key" ON "pekerjaan"("uuid");

-- AddForeignKey
ALTER TABLE "warga" ADD CONSTRAINT "warga_id_status_warga_fkey" FOREIGN KEY ("id_status_warga") REFERENCES "status_warga"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "warga" ADD CONSTRAINT "warga_id_pekerjaan_fkey" FOREIGN KEY ("id_pekerjaan") REFERENCES "pekerjaan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
