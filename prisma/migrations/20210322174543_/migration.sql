/*
  Warnings:

  - You are about to drop the column `accountsSecret_id` on the `Server` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Server" DROP CONSTRAINT "Server_accountsSecret_id_fkey";

-- AlterTable
ALTER TABLE "Accounts" ADD COLUMN     "serverId" TEXT;

-- AlterTable
ALTER TABLE "Server" DROP COLUMN "accountsSecret_id";

-- AddForeignKey
ALTER TABLE "Accounts" ADD FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE SET NULL ON UPDATE CASCADE;
