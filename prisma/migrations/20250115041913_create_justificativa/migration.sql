-- CreateTable
CREATE TABLE "Justification" (
    "id" SERIAL NOT NULL,
    "collaboratorId" INTEGER NOT NULL,
    "justification" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Justification_pkey" PRIMARY KEY ("id")
);
