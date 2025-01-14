/*
  Warnings:

  - You are about to drop the `photo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "photo" DROP CONSTRAINT "photo_id_warga_fkey";

-- DropTable
DROP TABLE "photo";

-- CreateTable
CREATE TABLE "polygon" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "polygon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gps_location" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "id_kk" INTEGER NOT NULL,

    CONSTRAINT "gps_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo_warga" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,
    "keterangan" TEXT,
    "url" TEXT NOT NULL,
    "id_warga" INTEGER NOT NULL,

    CONSTRAINT "photo_warga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo_kk" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,
    "keterangan" TEXT,
    "url" TEXT NOT NULL,
    "id_kk" INTEGER NOT NULL,

    CONSTRAINT "photo_kk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "polygon_uuid_key" ON "polygon"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "gps_location_uuid_key" ON "gps_location"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "photo_warga_uuid_key" ON "photo_warga"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "photo_kk_uuid_key" ON "photo_kk"("uuid");

-- AddForeignKey
ALTER TABLE "gps_location" ADD CONSTRAINT "gps_location_id_kk_fkey" FOREIGN KEY ("id_kk") REFERENCES "kk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo_warga" ADD CONSTRAINT "photo_warga_id_warga_fkey" FOREIGN KEY ("id_warga") REFERENCES "warga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo_kk" ADD CONSTRAINT "photo_kk_id_kk_fkey" FOREIGN KEY ("id_kk") REFERENCES "kk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
