-- CreateTable
CREATE TABLE "Server" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'yok',
    "ip" TEXT NOT NULL DEFAULT E'0.0.0.0',

    PRIMARY KEY ("id")
);
