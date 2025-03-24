/*
  Warnings:

  - A unique constraint covering the columns `[area,projectCode]` on the table `Projeto` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[area,projectCode,subprojectCode]` on the table `Projeto` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Projeto_projectCode_key";

-- CreateIndex
CREATE UNIQUE INDEX "Projeto_area_projectCode_key" ON "Projeto"("area", "projectCode");

-- CreateIndex
CREATE UNIQUE INDEX "Projeto_area_projectCode_subprojectCode_key" ON "Projeto"("area", "projectCode", "subprojectCode");
