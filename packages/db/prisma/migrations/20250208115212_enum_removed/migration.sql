/*
  Warnings:

  - Changed the type of `type` on the `Shapes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Shapes" ADD COLUMN     "stroke" TEXT NOT NULL DEFAULT '#d3d3d3',
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ShapeType";
