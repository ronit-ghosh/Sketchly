/*
  Warnings:

  - You are about to drop the column `message` on the `Chat` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ShapeType" AS ENUM ('RECT', 'CIRCLE');

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "message";

-- CreateTable
CREATE TABLE "Shapes" (
    "id" SERIAL NOT NULL,
    "shape_id" TEXT NOT NULL,
    "type" "ShapeType" NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "radius" INTEGER,
    "top" INTEGER NOT NULL,
    "left" INTEGER NOT NULL,
    "angle" INTEGER,
    "fill" TEXT,
    "chatId" INTEGER NOT NULL,

    CONSTRAINT "Shapes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shapes_shape_id_key" ON "Shapes"("shape_id");

-- AddForeignKey
ALTER TABLE "Shapes" ADD CONSTRAINT "Shapes_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
