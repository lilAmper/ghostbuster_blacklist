/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[token]` on the table `Server`. If there are existing duplicate values, the migration will fail.
  - The required column `token` was added to the `Server` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Server.token_unique" ON "Server"("token");
