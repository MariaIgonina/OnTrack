-- CreateTable
CREATE TABLE "Applicant" (
    "idDB" SERIAL NOT NULL,
    "idAuth0" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "familyName" TEXT NOT NULL,
    "age" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "currentLocation" TEXT[],
    "readyMove" BOOLEAN NOT NULL,
    "workingHours" TEXT NOT NULL,
    "workingModal" TEXT NOT NULL,
    "socialMedia" TEXT[],
    "skillsProf" TEXT[],
    "stack" TEXT[],
    "compLanguages" TEXT[],
    "about" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "languages" TEXT[],
    "hobbies" TEXT[],
    "salaryRange" INTEGER NOT NULL,
    "desiredLocation" TEXT[],
    "notDesiredLocation" TEXT[],
    "desiredWorkingModal" TEXT NOT NULL,

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
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "founded" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "externalLinks" TEXT[],
    "headOffice" TEXT NOT NULL,

    CONSTRAINT "Recruiter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vacancy" (
    "id" SERIAL NOT NULL,
    "recruiterId" INTEGER NOT NULL,
    "about" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "workingHours" TEXT NOT NULL,
    "workingModal" TEXT NOT NULL,
    "skills" TEXT[],
    "stack" TEXT[],
    "requiredLanguages" TEXT[],
    "experience" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "salaryRange" INTEGER NOT NULL,

    CONSTRAINT "Vacancy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" SERIAL NOT NULL,
    "recruiterID" INTEGER NOT NULL,
    "applicantID" INTEGER,
    "reject" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "vacancyId" INTEGER NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "durationInMs" INTEGER NOT NULL,
    "hidden" BOOLEAN NOT NULL,
    "statusStep" BOOLEAN NOT NULL,
    "trackId" INTEGER NOT NULL,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "trackId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "files" TEXT[],
    "stepId" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "stepId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "scheduleDate" TEXT NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questionary" (
    "id" SERIAL NOT NULL,
    "questions" TEXT[],
    "answer" TEXT[],
    "date" TIMESTAMP(3) NOT NULL,
    "stepId" INTEGER,

    CONSTRAINT "Questionary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_idAuth0_key" ON "Applicant"("idAuth0");

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_email_key" ON "Applicant"("email");

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("idDB") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_applicantIdDB_fkey" FOREIGN KEY ("applicantIdDB") REFERENCES "Applicant"("idDB") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "Recruiter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_applicantID_fkey" FOREIGN KEY ("applicantID") REFERENCES "Applicant"("idDB") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_recruiterID_fkey" FOREIGN KEY ("recruiterID") REFERENCES "Recruiter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questionary" ADD CONSTRAINT "Questionary_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE SET NULL ON UPDATE CASCADE;
