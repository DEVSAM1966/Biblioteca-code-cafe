/*
  Warnings:

  - You are about to alter the column `edition_date` on the `books` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `DateTime(3)`.
  - You are about to drop the column `rol` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `author_id` on table `books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `publisher_id` on table `books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category_id` on table `books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dni` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `registration_date` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_drop` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `days_disciplinary` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `books` DROP FOREIGN KEY `books_ibfk_1`;

-- DropForeignKey
ALTER TABLE `books` DROP FOREIGN KEY `books_ibfk_2`;

-- DropForeignKey
ALTER TABLE `books` DROP FOREIGN KEY `books_ibfk_3`;

-- AlterTable
ALTER TABLE `books` MODIFY `edition_date` DATETIME(3) NULL,
    MODIFY `author_id` INTEGER NOT NULL,
    MODIFY `publisher_id` INTEGER NOT NULL,
    MODIFY `category_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `rol`,
    ADD COLUMN `role` ENUM('USER') NOT NULL DEFAULT 'USER',
    MODIFY `dni` VARCHAR(20) NOT NULL,
    MODIFY `phone` VARCHAR(50) NOT NULL,
    MODIFY `email` VARCHAR(120) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `registration_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `user_drop` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `days_disciplinary` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX `books_title_idx` ON `books`(`title`);

-- CreateIndex
CREATE UNIQUE INDEX `users_phone_key` ON `users`(`phone`);

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `authors`(`author_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`publisher_id`) REFERENCES `publishers`(`publisher_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `users` RENAME INDEX `dni` TO `users_dni_key`;
