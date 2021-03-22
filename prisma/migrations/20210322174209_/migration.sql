-- CreateEnum
CREATE TYPE "ServerType" AS ENUM ('SAMP', 'RAGEMP', 'ALTV');

-- CreateTable
CREATE TABLE "Server" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'yok',
    "ip" TEXT NOT NULL DEFAULT E'0.0.0.0',
    "port" INTEGER NOT NULL DEFAULT 7777,
    "type" "ServerType" NOT NULL DEFAULT E'SAMP',
    "bansId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bans" (
    "id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL DEFAULT E'yok',
    "user_ip" TEXT NOT NULL DEFAULT E'0.0.0.0',
    "user_hwid" TEXT NOT NULL DEFAULT E'yok',
    "reason" TEXT NOT NULL DEFAULT E'yok',
    "serverId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accounts" (
    "secret_id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'yok',
    "lastip" TEXT NOT NULL DEFAULT E'0.0.0.0',
    "serverId" TEXT,

    PRIMARY KEY ("secret_id")
);

-- AddForeignKey
ALTER TABLE "Bans" ADD FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accounts" ADD FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE SET NULL ON UPDATE CASCADE;
