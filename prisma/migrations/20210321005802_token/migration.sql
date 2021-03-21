/*
  Warnings:

  - The `type` column on the `Server` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ServerType" AS ENUM ('SAMP', 'RAGEMP', 'ALTV');

-- DropIndex
DROP INDEX "Server.token_unique";

-- AlterTable
ALTER TABLE "Server" DROP COLUMN "type",
ADD COLUMN     "type" "ServerType" NOT NULL DEFAULT E'SAMP';
