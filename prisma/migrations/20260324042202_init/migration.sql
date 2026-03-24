-- CreateEnum
CREATE TYPE "Seniority" AS ENUM ('JUNIOR', 'MID', 'SENIOR', 'STAFF', 'LEAD', 'PRINCIPAL');

-- CreateEnum
CREATE TYPE "SkillCategory" AS ENUM ('LANGUAGE', 'FRAMEWORK', 'TOOL', 'DATABASE', 'CLOUD');

-- CreateEnum
CREATE TYPE "AvatarStyle" AS ENUM ('GEOMETRIC', 'ABSTRACT');

-- CreateEnum
CREATE TYPE "DeveloperStatus" AS ENUM ('AVAILABLE', 'BUSY', 'UNAVAILABLE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Developer" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "seniority" "Seniority" NOT NULL,
    "role" TEXT NOT NULL,
    "systemRole" "UserRole" NOT NULL DEFAULT 'USER',
    "bio" VARCHAR(500),
    "readme" TEXT,
    "location" TEXT,
    "experienceYears" INTEGER NOT NULL,
    "avatarStyle" "AvatarStyle" NOT NULL,
    "avatarSeed" TEXT NOT NULL,
    "status" "DeveloperStatus" NOT NULL,
    "remoteOk" BOOLEAN NOT NULL DEFAULT true,
    "githubUrl" TEXT,
    "linkedinUrl" TEXT,
    "twitterUrl" TEXT,
    "portfolioUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "SkillCategory" NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeveloperSkill" (
    "developerId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "DeveloperSkill_pkey" PRIMARY KEY ("developerId","skillId")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "developerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "repoUrl" TEXT,
    "productionUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Developer_email_key" ON "Developer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Developer_username_key" ON "Developer"("username");

-- CreateIndex
CREATE INDEX "Developer_location_idx" ON "Developer"("location");

-- CreateIndex
CREATE INDEX "Developer_seniority_idx" ON "Developer"("seniority");

-- CreateIndex
CREATE INDEX "Developer_status_idx" ON "Developer"("status");

-- CreateIndex
CREATE INDEX "Developer_createdAt_idx" ON "Developer"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE INDEX "Skill_name_idx" ON "Skill"("name");

-- AddForeignKey
ALTER TABLE "DeveloperSkill" ADD CONSTRAINT "DeveloperSkill_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeveloperSkill" ADD CONSTRAINT "DeveloperSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
