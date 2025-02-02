-- CreateTable
CREATE TABLE "wilayah" (
    "kode" TEXT NOT NULL,
    "wilayah" TEXT NOT NULL,

    CONSTRAINT "wilayah_pkey" PRIMARY KEY ("kode")
);

-- CreateIndex
CREATE UNIQUE INDEX "wilayah_kode_key" ON "wilayah"("kode");
