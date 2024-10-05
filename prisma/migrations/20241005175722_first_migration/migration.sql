-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('normal', 'admin');

-- CreateEnum
CREATE TYPE "ExchangeState" AS ENUM ('Applied', 'Processing', 'Converted');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "userType" "UserType" NOT NULL DEFAULT 'normal',
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exchange" (
    "id" SERIAL NOT NULL,
    "requesterId" INTEGER NOT NULL,
    "requestedWith" TEXT NOT NULL,
    "requestedFor" TEXT NOT NULL,
    "requestedWithBank" TEXT NOT NULL,
    "requestedForBank" TEXT NOT NULL,
    "onRate" INTEGER NOT NULL DEFAULT 0,
    "requestedWithBankDetails" TEXT NOT NULL,
    "requestedForBankDetails" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "state" "ExchangeState" NOT NULL DEFAULT 'Applied',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exchange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Home_Page" (
    "id" SERIAL NOT NULL,
    "hero_list" TEXT NOT NULL,

    CONSTRAINT "Home_Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Buying_rates" (
    "id" SERIAL NOT NULL,
    "payeer" INTEGER NOT NULL DEFAULT 100,
    "ethereum" INTEGER NOT NULL DEFAULT 100,
    "litecoin" INTEGER NOT NULL DEFAULT 100,
    "dogecoin" INTEGER NOT NULL DEFAULT 100,
    "perfectmoney" INTEGER NOT NULL DEFAULT 100,
    "pyypl" INTEGER NOT NULL DEFAULT 100,
    "shibcoin" INTEGER NOT NULL DEFAULT 100,
    "tether" INTEGER NOT NULL DEFAULT 100,
    "troncoin" INTEGER NOT NULL DEFAULT 100,
    "webmoney" INTEGER NOT NULL DEFAULT 100,

    CONSTRAINT "Buying_rates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Selling_rates" (
    "id" SERIAL NOT NULL,
    "payeer" INTEGER NOT NULL DEFAULT 100,
    "ethereum" INTEGER NOT NULL DEFAULT 100,
    "litecoin" INTEGER NOT NULL DEFAULT 100,
    "dogecoin" INTEGER NOT NULL DEFAULT 100,
    "perfectmoney" INTEGER NOT NULL DEFAULT 100,
    "pyypl" INTEGER NOT NULL DEFAULT 100,
    "shibcoin" INTEGER NOT NULL DEFAULT 100,
    "tether" INTEGER NOT NULL DEFAULT 100,
    "troncoin" INTEGER NOT NULL DEFAULT 100,
    "webmoney" INTEGER NOT NULL DEFAULT 100,

    CONSTRAINT "Selling_rates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Exchange_requesterId_idx" ON "Exchange"("requesterId");
