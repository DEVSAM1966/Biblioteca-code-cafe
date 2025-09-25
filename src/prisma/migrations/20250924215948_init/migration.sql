-- CreateTable
CREATE TABLE `authors` (
    `author_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_author` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`author_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `books` (
    `isbn` VARCHAR(13) NOT NULL,
    `title` VARCHAR(55) NOT NULL,
    `pages` INTEGER NULL,
    `summary` VARCHAR(255) NULL,
    `edition_date` VARCHAR(10) NULL,
    `book_cover` VARCHAR(255) NULL,
    `book_file` VARCHAR(255) NULL,
    `language` VARCHAR(20) NULL,
    `authors` VARCHAR(100) NULL,
    `author_id` INTEGER NULL,
    `publisher_id` INTEGER NULL,
    `category_id` INTEGER NULL,

    INDEX `author_id`(`author_id`),
    INDEX `category_id`(`category_id`),
    INDEX `publisher_id`(`publisher_id`),
    PRIMARY KEY (`isbn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_category` VARCHAR(30) NOT NULL,
    `subtopic_category` VARCHAR(30) NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `histories` (
    `history_id` INTEGER NOT NULL AUTO_INCREMENT,
    `loan_id` INTEGER NULL,
    `date_feedback` DATE NULL,
    `feedback` VARCHAR(255) NULL,

    INDEX `loan_id`(`loan_id`),
    PRIMARY KEY (`history_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loans` (
    `loan_id` INTEGER NOT NULL AUTO_INCREMENT,
    `loan_date` DATE NULL,
    `return_date` DATE NULL,
    `user_id` INTEGER NULL,
    `isbn` VARCHAR(13) NULL,

    INDEX `isbn`(`isbn`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`loan_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `publishers` (
    `publisher_id` INTEGER NOT NULL,
    `name_publisher` VARCHAR(100) NOT NULL,
    `address` VARCHAR(100) NULL,
    `city` VARCHAR(40) NULL,
    `province` VARCHAR(30) NULL,
    `postal_code` VARCHAR(20) NULL,
    `country` VARCHAR(30) NULL,
    `phone` VARCHAR(16) NULL,
    `notes` VARCHAR(255) NULL,

    PRIMARY KEY (`publisher_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(30) NOT NULL,
    `user_surname` VARCHAR(60) NULL,
    `dni` VARCHAR(20) NULL,
    `address` VARCHAR(100) NULL,
    `city` VARCHAR(40) NULL,
    `province` VARCHAR(30) NULL,
    `postal_code` VARCHAR(20) NULL,
    `country` VARCHAR(30) NULL,
    `phone` VARCHAR(16) NULL,
    `email` VARCHAR(120) NULL,
    `password` VARCHAR(25) NULL,
    `registration_date` DATE NULL,
    `user_drop` BOOLEAN NULL DEFAULT true,
    `days_disciplinary` INTEGER NULL DEFAULT 0,
    `rol` VARCHAR(20) NULL,

    UNIQUE INDEX `dni`(`dni`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `authors`(`author_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`publisher_id`) REFERENCES `publishers`(`publisher_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `histories` ADD CONSTRAINT `histories_ibfk_1` FOREIGN KEY (`loan_id`) REFERENCES `loans`(`loan_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `loans` ADD CONSTRAINT `loans_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `loans` ADD CONSTRAINT `loans_ibfk_2` FOREIGN KEY (`isbn`) REFERENCES `books`(`isbn`) ON DELETE RESTRICT ON UPDATE CASCADE;
