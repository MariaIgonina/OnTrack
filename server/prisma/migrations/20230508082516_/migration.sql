-- CreateTable
CREATE TABLE "User" (
    "idDB" SERIAL NOT NULL,
    "idAuth0" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "familyName" TEXT NOT NULL,
    "age" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "inProgressApplications" TEXT[],
    "coordinateX" TEXT NOT NULL,
    "coordinateY" TEXT NOT NULL,
    "readyMove" BOOLEAN NOT NULL,
    "workingHours" TEXT NOT NULL,
    "workingModal" TEXT NOT NULL,
    "socialMedia" TEXT[],
    "skillsProf" TEXT[],
    "stack" TEXT[],
    "compLanguages" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("idDB")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "founded" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "externalLinks" TEXT[],
    "headOffice" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vacancy" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "about" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "recruitantID" TEXT NOT NULL,
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
    "recruitantID" TEXT NOT NULL,
    "applicantID" TEXT NOT NULL,
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
    "userId" INTEGER NOT NULL,
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
CREATE UNIQUE INDEX "User_idAuth0_key" ON "User"("idAuth0");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idDB") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questionary" ADD CONSTRAINT "Questionary_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE SET NULL ON UPDATE CASCADE;
