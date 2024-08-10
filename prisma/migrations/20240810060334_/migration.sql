-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `mobile` INTEGER NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `userType` ENUM('normal', 'admin') NOT NULL DEFAULT 'normal',
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_mobile_key`(`mobile`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `senderId` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exchange` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `requesterId` INTEGER NOT NULL,
    `requestedWith` VARCHAR(191) NOT NULL,
    `requestedFor` VARCHAR(191) NOT NULL,
    `requestedWithBank` VARCHAR(191) NOT NULL,
    `requestedForBank` VARCHAR(191) NOT NULL,
    `onRate` INTEGER NOT NULL DEFAULT 0,
    `requestedWithBankDetails` VARCHAR(191) NOT NULL,
    `requestedForBankDetails` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `state` ENUM('Applied', 'Processing', 'Converted') NOT NULL DEFAULT 'Applied',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Exchange_requesterId_idx`(`requesterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Home_Page` (
    `id` INTEGER NOT NULL,
    `hero_list` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Buying_rates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `payeer` INTEGER NOT NULL DEFAULT 0,
    `ethereum` INTEGER NOT NULL DEFAULT 0,
    `litecoin` INTEGER NOT NULL DEFAULT 0,
    `dogecoin` INTEGER NOT NULL DEFAULT 0,
    `perfectmoney` INTEGER NOT NULL DEFAULT 0,
    `pyypl` INTEGER NOT NULL DEFAULT 0,
    `shibcoin` INTEGER NOT NULL DEFAULT 0,
    `tether` INTEGER NOT NULL DEFAULT 0,
    `troncoin` INTEGER NOT NULL DEFAULT 0,
    `webmoney` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Selling_rates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `payeer` INTEGER NOT NULL DEFAULT 0,
    `ethereum` INTEGER NOT NULL DEFAULT 0,
    `litecoin` INTEGER NOT NULL DEFAULT 0,
    `dogecoin` INTEGER NOT NULL DEFAULT 0,
    `perfectmoney` INTEGER NOT NULL DEFAULT 0,
    `pyypl` INTEGER NOT NULL DEFAULT 0,
    `shibcoin` INTEGER NOT NULL DEFAULT 0,
    `tether` INTEGER NOT NULL DEFAULT 0,
    `troncoin` INTEGER NOT NULL DEFAULT 0,
    `webmoney` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
