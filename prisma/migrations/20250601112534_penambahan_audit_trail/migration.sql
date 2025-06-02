-- CreateTable
CREATE TABLE "trail" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "activity" TEXT NOT NULL,

    CONSTRAINT "trail_pkey" PRIMARY KEY ("id")
);
