import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// import dotenv from "dotenv";
// dotenv.config();

const prisma = new PrismaClient();

const createTrack = async (req: Request, res: Response) => {
  const { vacancyId, recruiterID } = req.body;
  try {
    const track = await prisma.track.create({
      data: {
        Vacancy: { connect: { id: +vacancyId } },
        Recruiter: { connect: { id: +recruiterID } },
      },
    });
    return res.status(200).json(track);
  } catch (error: any) {
    if (
      error.meta.cause ===
      "No 'Vacancy' record(s) (needed to inline the relation on 'Track' record(s)) was found for a nested connect on one-to-many relation 'TrackToVacancy'."
    ) {
      return res.status(400).json("Vacancy not found");
    }

    if (
      error.meta.cause ===
      "No 'Recruiter' record(s)(needed to inline the relation on 'Track' record(s)) was found for a nested connect on one - to - many relation 'RecruiterToTrack'."
    ) {
      return res.status(400).json("Recruitant not found");
    }
    console.log("unknown error in createTrack controller", error);
    return res
      .status(500)
      .json("unknown error in createTrack controller: " + error);
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
    const trackId = req.params.trackId;
    const tracks = await prisma.track.findUnique({
      where: {
        id: +trackId,
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
  // const { reject, applicantNotes } = req.body;

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
    if (error.meta.cause === "Record to update does not exist")
      res.status(404).json(error.meta.cause);
    else res.status(409).json(error.meta.cause);
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
};
