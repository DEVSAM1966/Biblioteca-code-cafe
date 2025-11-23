-- AlterTable
ALTER TABLE `loans` MODIFY `loan_date` DATE NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('ADMIN', 'SUPPORT', 'USER') NOT NULL DEFAULT 'USER';
