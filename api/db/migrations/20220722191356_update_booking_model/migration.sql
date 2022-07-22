/*
  Warnings:

  - Added the required column `subscription` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeslot` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "email" TEXT,
ADD COLUMN     "firstname" TEXT,
ADD COLUMN     "lastname" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "subscription" INTEGER NOT NULL,
ADD COLUMN     "timeslot" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "details" SET DATA TYPE TEXT;
