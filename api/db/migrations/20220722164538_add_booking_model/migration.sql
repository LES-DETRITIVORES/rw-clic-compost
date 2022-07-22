-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pickedAt" TIMESTAMP(3) NOT NULL,
    "timeslot" TEXT,
    "user" INTEGER NOT NULL,
    "subscription" INTEGER NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "location" TEXT,
    "details" TEXT,
    "status" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
