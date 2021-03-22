/*
  Warnings:

  - You are about to drop the `_AccountsToServer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AccountsToServer" DROP CONSTRAINT "_AccountsToServer_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccountsToServer" DROP CONSTRAINT "_AccountsToServer_B_fkey";

-- DropTable
DROP TABLE "_AccountsToServer";
