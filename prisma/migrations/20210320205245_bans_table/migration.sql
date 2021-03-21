-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "bansId" TEXT;

-- CreateTable
CREATE TABLE "Bans" (
    "id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL DEFAULT E'yok',
    "user_ip" TEXT NOT NULL DEFAULT E'0.0.0.0',
    "user_hwid" TEXT NOT NULL DEFAULT E'yok',
    "serverId" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bans" ADD FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE SET NULL ON UPDATE CASCADE;
