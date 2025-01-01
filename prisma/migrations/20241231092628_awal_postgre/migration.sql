-- CreateTable
CREATE TABLE "kk" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "no_kk" TEXT NOT NULL,
    "no_blok" TEXT NOT NULL,
    "no_rumah" INTEGER NOT NULL,

    CONSTRAINT "kk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entity" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dusun" TEXT NOT NULL,
    "desa" TEXT NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "kabupaten" TEXT NOT NULL,
    "provinsi" TEXT NOT NULL,
    "rt" INTEGER NOT NULL,
    "rw" INTEGER NOT NULL,
    "kode_wilayah" TEXT NOT NULL,

    CONSTRAINT "entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "warga" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,
    "id_type" INTEGER NOT NULL,
    "id_kk" INTEGER,
    "nik" TEXT,
    "jenis_kelamin" BOOLEAN DEFAULT true,
    "tempat_lahir" TEXT,
    "tanggal_lahir" TIMESTAMP(3),
    "no_hp" TEXT,

    CONSTRAINT "warga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "iuran" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,
    "iuran" INTEGER,
    "keterangan" TEXT,

    CONSTRAINT "iuran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setor" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_kk" INTEGER NOT NULL,
    "nilai" INTEGER NOT NULL,
    "id_iuran" INTEGER NOT NULL,
    "keterangan" TEXT,
    "tanggal" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anggaran" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_warga" INTEGER NOT NULL,
    "nilai" INTEGER NOT NULL,
    "id_jenis_anggaran" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "keterangan" TEXT,
    "id_type_anggaran" INTEGER NOT NULL,

    CONSTRAINT "anggaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jenis_anggaran" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,
    "id_type_anggaran" INTEGER NOT NULL,
    "keterangan" TEXT,

    CONSTRAINT "jenis_anggaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_anggaran" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "type_anggaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,
    "keterangan" TEXT,
    "url" TEXT NOT NULL,
    "id_warga" INTEGER NOT NULL,

    CONSTRAINT "photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bukti" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,
    "keterangan" TEXT,
    "url" TEXT NOT NULL,
    "id_anggaran" INTEGER NOT NULL,

    CONSTRAINT "bukti_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filekeluarga" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,
    "keterangan" TEXT,
    "url" TEXT NOT NULL,
    "id_kk" INTEGER NOT NULL,

    CONSTRAINT "filekeluarga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filewarga" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,
    "keterangan" TEXT,
    "id_warga" INTEGER NOT NULL,

    CONSTRAINT "filewarga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userid" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "id_level" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "level" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT,

    CONSTRAINT "level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "token" VARCHAR(25) NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo_user" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,
    "keterangan" TEXT,
    "url" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "photo_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "kk_uuid_key" ON "kk"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "entity_uuid_key" ON "entity"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "warga_uuid_key" ON "warga"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "type_uuid_key" ON "type"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "iuran_uuid_key" ON "iuran"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "setor_uuid_key" ON "setor"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "anggaran_uuid_key" ON "anggaran"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "jenis_anggaran_uuid_key" ON "jenis_anggaran"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "type_anggaran_uuid_key" ON "type_anggaran"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "photo_uuid_key" ON "photo"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "bukti_uuid_key" ON "bukti"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "filekeluarga_uuid_key" ON "filekeluarga"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "filewarga_uuid_key" ON "filewarga"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "user_uuid_key" ON "user"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "token_token_key" ON "token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "photo_user_uuid_key" ON "photo_user"("uuid");

-- AddForeignKey
ALTER TABLE "warga" ADD CONSTRAINT "warga_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "warga" ADD CONSTRAINT "warga_id_kk_fkey" FOREIGN KEY ("id_kk") REFERENCES "kk"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "setor" ADD CONSTRAINT "setor_id_kk_fkey" FOREIGN KEY ("id_kk") REFERENCES "kk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "setor" ADD CONSTRAINT "setor_id_iuran_fkey" FOREIGN KEY ("id_iuran") REFERENCES "iuran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anggaran" ADD CONSTRAINT "anggaran_id_warga_fkey" FOREIGN KEY ("id_warga") REFERENCES "warga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anggaran" ADD CONSTRAINT "anggaran_id_jenis_anggaran_fkey" FOREIGN KEY ("id_jenis_anggaran") REFERENCES "jenis_anggaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anggaran" ADD CONSTRAINT "anggaran_id_type_anggaran_fkey" FOREIGN KEY ("id_type_anggaran") REFERENCES "type_anggaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jenis_anggaran" ADD CONSTRAINT "jenis_anggaran_id_type_anggaran_fkey" FOREIGN KEY ("id_type_anggaran") REFERENCES "type_anggaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo" ADD CONSTRAINT "photo_id_warga_fkey" FOREIGN KEY ("id_warga") REFERENCES "warga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bukti" ADD CONSTRAINT "bukti_id_anggaran_fkey" FOREIGN KEY ("id_anggaran") REFERENCES "anggaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filekeluarga" ADD CONSTRAINT "filekeluarga_id_kk_fkey" FOREIGN KEY ("id_kk") REFERENCES "kk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filewarga" ADD CONSTRAINT "filewarga_id_warga_fkey" FOREIGN KEY ("id_warga") REFERENCES "warga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_level_fkey" FOREIGN KEY ("id_level") REFERENCES "level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo_user" ADD CONSTRAINT "photo_user_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
