-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pickedAt" TIMESTAMP(3) NOT NULL,
    "user" INTEGER NOT NULL,
    "details" INTEGER,
    "status" TEXT,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
