-- CreateTable
CREATE TABLE "Applicant" (
    "idDB" SERIAL NOT NULL,
    "idAuth" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "familyName" TEXT,
    "age" TIMESTAMP(3),
    "phone" TEXT,
    "location" TEXT,
    "currentLocation" TEXT[],
    "readyMove" BOOLEAN,
    "workingHours" TEXT,
    "workingModal" TEXT,
    "socialMedia" TEXT[],
    "skillsProf" TEXT[],
    "stack" TEXT[],
    "compLanguages" TEXT[],
    "about" TEXT,
    "video" TEXT,
    "languages" TEXT[],
    "hobbies" TEXT[],
    "salaryRange" INTEGER,
    "desiredLocation" TEXT[],
    "notDesiredLocation" TEXT[],
    "desiredWorkingModal" TEXT,

    CONSTRAINT "Applicant_pkey" PRIMARY KEY ("idDB")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "applicantId" INTEGER NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "place" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "degree" TEXT NOT NULL,
    "speciality" TEXT NOT NULL,
    "applicantIdDB" INTEGER,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recruiter" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "idAuth" TEXT NOT NULL,
    "recruiterName" TEXT NOT NULL,
    "name" TEXT,
    "logo" TEXT,
    "founded" TEXT,
    "about" TEXT,
    "externalLinks" TEXT[],
    "headOffice" TEXT,

    CONSTRAINT "Recruiter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vacancy" (
    "id" SERIAL NOT NULL,
    "recruiterId" INTEGER NOT NULL,
    "about" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "workingHours" TEXT,
    "workingModal" TEXT,
    "skills" TEXT[],
    "stack" TEXT[],
    "requiredLanguages" TEXT[],
    "experience" INTEGER,
    "location" TEXT NOT NULL,
    "salaryRange" INTEGER,
    "currentLocation" TEXT[],

    CONSTRAINT "Vacancy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" SERIAL NOT NULL,
    "recruiterID" INTEGER NOT NULL,
    "applicantID" INTEGER,
    "reject" BOOLEAN NOT NULL DEFAULT false,
    "applicantNotes" TEXT,
    "recruiterNotes" TEXT,
    "vacancyId" INTEGER NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questionary" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'Questionary',
    "questions" TEXT[],
    "answer" TEXT[],
    "date" TIMESTAMP(3) NOT NULL,
    "hidden" BOOLEAN NOT NULL,
    "trackId" INTEGER,

    CONSTRAINT "Questionary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Videocall" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'Sandbox',
    "date" TIMESTAMP(3) NOT NULL,
    "hidden" BOOLEAN NOT NULL,
    "trackId" INTEGER NOT NULL,

    CONSTRAINT "Videocall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeSandbox" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'Sandbox',
    "date" TIMESTAMP(3) NOT NULL,
    "hidden" BOOLEAN NOT NULL,
    "trackId" INTEGER NOT NULL,

    CONSTRAINT "CodeSandbox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'Message',
    "text" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "files" TEXT[],
    "trackId" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_idAuth_key" ON "Applicant"("idAuth");

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_email_key" ON "Applicant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Recruiter_idAuth_key" ON "Recruiter"("idAuth");

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("idDB") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_applicantIdDB_fkey" FOREIGN KEY ("applicantIdDB") REFERENCES "Applicant"("idDB") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "Recruiter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_recruiterID_fkey" FOREIGN KEY ("recruiterID") REFERENCES "Recruiter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_applicantID_fkey" FOREIGN KEY ("applicantID") REFERENCES "Applicant"("idDB") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questionary" ADD CONSTRAINT "Questionary_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Videocall" ADD CONSTRAINT "Videocall_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeSandbox" ADD CONSTRAINT "CodeSandbox_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
