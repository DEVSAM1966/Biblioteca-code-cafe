/*
  Warnings:

  - You are about to drop the column `user_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_surname` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name_author]` on the table `authors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fullname` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `user_name`,
    DROP COLUMN `user_surname`,
    ADD COLUMN `fullname` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `authors_name_author_key` ON `authors`(`name_author`);
