/*
  Warnings:

  - You are about to drop the column `serverId` on the `Accounts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_serverId_fkey";

-- AlterTable
ALTER TABLE "Accounts" DROP COLUMN "serverId";

-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "accountsSecret_id" TEXT;

-- AddForeignKey
ALTER TABLE "Server" ADD FOREIGN KEY ("accountsSecret_id") REFERENCES "Accounts"("secret_id") ON DELETE SET NULL ON UPDATE CASCADE;
