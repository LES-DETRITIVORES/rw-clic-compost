-- CreateTable
CREATE TABLE "Subscription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstname" TEXT,
    "lastname" TEXT,
    "company" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "location" TEXT,
    "meals" INTEGER,
    "service" TEXT,
    "startedAt" DATETIME NOT NULL
);
