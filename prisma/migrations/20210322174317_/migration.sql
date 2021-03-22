-- CreateTable
CREATE TABLE "_AccountsToServer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AccountsToServer_AB_unique" ON "_AccountsToServer"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountsToServer_B_index" ON "_AccountsToServer"("B");

-- AddForeignKey
ALTER TABLE "_AccountsToServer" ADD FOREIGN KEY ("A") REFERENCES "Accounts"("secret_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountsToServer" ADD FOREIGN KEY ("B") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;
