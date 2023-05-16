import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// import dotenv from "dotenv";
// dotenv.config();

const prisma = new PrismaClient();

const createTrack = async (req: Request, res: Response) => {
  const {
    vacancyId,
    recruiterID,
    applicantID,
    reject,
    applicantNotes,
    recruiterNotes,
  } = req.body;

  try {
    const track = await prisma.track.create({
      data: {
        reject,
        applicantNotes,
        recruiterNotes,
        Vacancy: { connect: { id: +vacancyId } },
        Recruiter: { connect: { id: +recruiterID } },
        Applicant: applicantID
          ? { connect: { idDB: +applicantID } }
          : undefined,
      },
    });
    return res.status(200).json(track);
  } catch (error: any) {
    // if (
    //   error.meta.cause ===
    //   "No 'Vacancy' record(s) (needed to inline the relation on 'Track' record(s)) was found for a nested connect on one-to-many relation 'TrackToVacancy'."
    // ) {
    //   return res.status(400).json("Vacancy not found");
    // }

    // if (
    //   error.meta.cause ===
    //   "No 'Recruiter' record(s)(needed to inline the relation on 'Track' record(s)) was found for a nested connect on one - to - many relation 'RecruiterToTrack'."
    // ) {
    //   return res.status(400).json("Recruitant not found");
    // }
    console.log("unknown error in createTrack controller", error);
    return res
      .status(500)
      .json("unknown error in createTrack controller: " + error);
  }
};
const duplicateTrack = async (req: Request, res: Response) => {
  const { vacancyId, recruiterID, applicantID } = req.body;
  try {
    const vacancy = await prisma.vacancy.findUnique({
      where: { id: +vacancyId },
      include: {
        jobTrack: {
          include: {
            Questionaries: true,
            Videocall: true,
            CodeSandbox: true,
          },
        },
      },
    });
    const sortedJobTracks = vacancy?.jobTrack.sort((a, b) => a.id - b.id);
    const templateTrack = sortedJobTracks?.[0];
    console.log("from dulpicate", templateTrack);

    const newTrack = JSON.parse(JSON.stringify(templateTrack));
    console.log("NEWW TRACCK", newTrack);
    delete newTrack.id;
    delete newTrack.applicantID;
    delete newTrack.recruiterID;
    delete newTrack.vacancyId;
    // newTrack.recruiterID = recruiterID;
    // newTrack.applicantID = parseInt(applicantID, 10);
    if (newTrack.Questionaries.length) {
      newTrack.Questionaries.forEach((q: any) => {
        delete q.trackId;
        delete q.id;
      });
    }
    if (newTrack.Videocall.length) {
      newTrack.Videocall.forEach((q: any) => {
        delete q.trackId;
        delete q.id;
      });
    }

    if (newTrack.CodeSandbox.length) {
      newTrack.CodeSandbox.forEach((q: any) => {
        delete q.trackId;
        delete q.id;
      });
    }

    const createdTrack = await prisma.track.create({
      data: {
        ...newTrack,
        Vacancy: { connect: { id: +vacancyId } },
        Recruiter: { connect: { id: +recruiterID } },
        Applicant: { connect: { idDB: parseInt(applicantID, 10) } },
        ...(newTrack.Questionaries
          ? {
              Questionaries: {
                create: newTrack.Questionaries,
              },
            }
          : {}),
        ...(newTrack.Videocall
          ? {
              Videocall: {
                create: newTrack.Videocall,
              },
            }
          : {}),
        ...(newTrack.CodeSandbox
          ? {
              CodeSandbox: {
                create: newTrack.CodeSandbox,
              },
            }
          : {}),
      },
    });
    // for (const questionary of newTrack.Questionaries) {
    //   await createQuestionnary({
    //     ...questionary,
    //     trackId: createdTrack.id,
    //   });
    // }

    return res.status(200).json(createdTrack.id);
  } catch (error: any) {
    console.log(
      "Unknown error in createNewTrackFromTemplate controller",
      error
    );
    return res
      .status(500)
      .json("Unknown error in createNewTrackFromTemplate controller: " + error);
  }
};

const getTracksByVacancy = async (req: Request, res: Response) => {
  try {
    const vacancyId = req.params.vacancyId;
    const tracks = await prisma.track.findMany({
      where: {
        vacancyId: +vacancyId,
      },
      include: {
        CodeSandbox: true,
        Videocall: true,
        Questionaries: true,
        Message: true,
      },
    });
    return res.status(200).json(tracks);
  } catch (error: any) {
    console.log(error);
  }
};

const getTracksByRecruiter = async (req: Request, res: Response) => {
  try {
    const recruiterID = req.params.recruiterId;
    console.log(recruiterID);
    const tracks = await prisma.track.findMany({
      where: {
        recruiterID: +recruiterID,
      },
      include: {
        CodeSandbox: true,
        Videocall: true,
        Questionaries: true,
        Message: true,
      },
    });

    return res.status(200).json(tracks);
  } catch (error: any) {
    console.log(error);
  }
};

const getTracksByApplicant = async (req: Request, res: Response) => {
  try {
    const applicantID = req.params.applicantId;
    const tracks = await prisma.track.findMany({
      where: {
        applicantID: +applicantID,
      },
      include: {
        CodeSandbox: true,
        Videocall: true,
        Questionaries: true,
        Message: true,
      },
    });
    return res.status(200).json(tracks);
  } catch (error: any) {
    console.log(error);
  }
};
const getTrackById = async (req: Request, res: Response) => {
  try {
    const trackId = parseInt(req.params.trackId, 10);
    const tracks = await prisma.track.findUnique({
      where: {
        id: trackId,
      },
      include: {
        CodeSandbox: true,
        Videocall: true,
        Questionaries: true,
        Message: true,
      },
    });
    return res.status(200).json(tracks);
  } catch (error: any) {
    console.log(error);
  }
};

async function deletetrack(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const track = await prisma.track.delete({
      where: {
        id: parseInt(id),
      },
      include: {
        CodeSandbox: true,
        Videocall: true,
        Questionaries: true,
        Message: true,
      },
    });
    res.json(track).status(204);
  } catch (error: any) {
    console.log(error);
    if (error.meta.cause === "Record to delete does not exist")
      res.status(404).json(error.meta.cause);
    else res.status(409).json(error.meta.cause);
  }
}

async function updatetrackbyId(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const track = await prisma.track.update({
      where: {
        id: parseInt(id),
      },
      data: req.body,
    });
    res.json(track).status(200);
  } catch (error: any) {
    console.log(error);
    if (error.meta?.cause === "Record to update does not exist")
      res.status(404).json(error.meta?.cause);
    else res.status(409).json(error);
  }
}

export const trackControllers = {
  createTrack,
  getTracksByVacancy,
  getTracksByRecruiter,
  getTracksByApplicant,
  deletetrack,
  updatetrackbyId,
  getTrackById,
  duplicateTrack,
};

async function createQuestionnary(questionaryData: any) {
  try {
    const questionary = await prisma.questionary.create({
      data: {
        questions: questionaryData.questions,
        answer: questionaryData.answer,
        date: questionaryData.date,
        hidden: Boolean(questionaryData.hidden),
        Track: { connect: { id: parseInt(questionaryData.trackId) } },
        order: questionaryData.order,
      },
    });
    return questionary;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
