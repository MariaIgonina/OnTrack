import { Request, Response } from "express";
import { Applicant, PrismaClient } from "@prisma/client";

import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

const createApplicant = async (req: Request, res: Response) => {
  try {
    const response = await prisma.applicant.create({
      data: req.body,
    });
    res.status(201).json(response);
  } catch (error: any) {
    if (error.meta.target[0] === "email" || error.meta.target[0] === "idAuth") {
      try {
        const foundApplicant = await prisma.applicant.findUnique({
          where: {
            email: req.body.email,
          },
        });
        res.status(200).json(foundApplicant);
      } catch (error) {
        res.status(500).json("Internal server error" + error);
      }
    } else {
      res.status(404).json(error.meta.cause);
    }
  }
};

const getApplicantById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("id for fetching one applicant is", id);
    const foundApplicant = await prisma.applicant.findUnique({
      where: {
        idDB: +id,
      },
      include: {
        education: true,
        track: true,
        experiences: true,
      },
    });
    if (!foundApplicant) throw new Error("Applicant not found!");
    res.status(200).json(foundApplicant);
  } catch (error: any) {
    console.log("error in applicantController, ", error);
    res.status(400).json(error);
  }
};

const getTypeofUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("seraching for one user with id =", id);
    const foundApplicant = await prisma.applicant.findUnique({
      where: {
        idAuth: id,
      },
      include: {
        education: true,
        track: true,
        experiences: true,
      },
    });
    const foundRecruiter = await prisma.recruiter.findUnique({
      where: {
        idAuth: id,
      },
    });
    // if (!foundApplicant) throw new Error("Applicant not found!");
    if (foundApplicant) {
      console.log("found applicatnt : ", foundApplicant);
      res.status(200).json(foundApplicant);
    } else {
      console.log("found recuraihriehdfia : ", foundRecruiter);
      res.status(200).json(foundRecruiter);
    }
  } catch (error: any) {
    console.log("error in applicantController, ", error);
    res.status(400).json(error);
  }
};

const updateApplicant = async (req: Request, res: Response) => {
  let {
    email,
    picture,
    name,
    familyName,
    age,
    phone,
    location,
    readyMove,
    workingHours,
    workingModal,
    about,
    video,
    salaryRange,
    desiredWorkingModal,
    currentLocation,
    socialMedia,
    skillsProf,
    stack,
    compLanguages,
    languages,
    hobbies,
    desiredLocation,
    notDesiredLocation,
  } = req.body;

  const id = +req.params.id;

  if (!currentLocation) currentLocation = [];
  if (!socialMedia) socialMedia = [];
  if (!skillsProf) skillsProf = [];
  if (!stack) stack = [];
  if (!compLanguages) compLanguages = [];
  if (!languages) languages = [];
  if (!hobbies) hobbies = [];
  if (!desiredLocation) desiredLocation = [];
  if (!notDesiredLocation) notDesiredLocation = [];

  let updatedData = {
    email,
    picture,
    name,
    familyName,
    age,
    phone,
    location,
    readyMove,
    workingHours,
    workingModal,
    about,
    video,
    salaryRange,
    desiredWorkingModal,
    currentLocation,
    socialMedia,
    skillsProf,
    stack,
    compLanguages,
    languages,
    hobbies,
    desiredLocation,
    notDesiredLocation,
  } as Applicant;

  try {
    const response = await prisma.applicant.update({
      where: { idDB: id },
      data: updatedData,
    });
    res.status(200).json(response);
  } catch (error: any) {
    console.log(error);
    if (error.meta) {
      error.meta.cause === "Record to update does not exist"
        ? res.status(404).json(error.meta.cause)
        : res.status(409).json(error.meta.cause);
    } else res.status(500).json(error);
  }
};

const getAllApplicants = async (req: Request, res: Response) => {
  try {
    const applicants = await prisma.applicant.findMany({
      include: {
        education: true,
        track: true,
        experiences: true,
      },
    });
    console.log(applicants, applicants.length);
    if (!applicants.length) throw new Error("Applicant not found!");
    res.status(200).json(applicants);
  } catch (error: any) {
    console.log(error);
    res.status(500).json();
  }
};

const deleteApplicant = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await prisma.applicant.delete({
      where: {
        idDB: +id,
      },
      include: {
        education: true,
        track: true,
        experiences: true,
      },
    });
    res.status(204).json(response);
  } catch (error: any) {
    console.log(error);
    if (error.meta.cause === "Record to delete does not exist")
      res.status(404).json(error.meta.cause);
    else res.status(409).json(error.meta.cause);
  }
};

const filterApplicants = async (req: Request, res: Response) => {
  const queryObj: any = {};
  let {
    salaryRange,
    languages,
    workingModal,
    workingHours,
    compLanguages,
    readyMove,
    stack,
    skillsProf,
    desiredLocation,
  } = req.query as {
    salaryRange?: string;
    languages?: string;
    workingModal?: string;
    workingHours?: string;
    compLanguages?: string;
    readyMove?: string;
    stack?: string;
    skillsProf?: string;
    desiredLocation?: string;
  };

  console.log(req.query);

  if (desiredLocation) {
    queryObj.OR = [
      { desiredLocation: { hasSome: String(desiredLocation).split(",") } },
      { location: desiredLocation },
    ];
  }
  if (salaryRange) {
    queryObj.salaryRange = { lte: +salaryRange! };
  }
  if (languages) {
    queryObj.languages = { hasSome: String(languages).split(",") };
  }
  if (workingModal) {
    queryObj.workingModal = workingModal;
  }
  if (workingHours) {
    queryObj.workingHours = workingHours;
  }
  if (compLanguages) {
    queryObj.compLanguages = {
      hasSome: String(compLanguages).split(","),
    };
  }
  if (readyMove) {
    queryObj.readyMove = Boolean(readyMove);
  }
  if (stack) {
    queryObj.stack = {
      hasSome: String(stack).split(","),
    };
  }
  if (skillsProf) {
    queryObj.skillsProf = {
      hasSome: String(skillsProf).split(","),
    };
  }

  try {
    const applicants = await prisma.applicant.findMany({
      where: { ...queryObj },
      include: {
        education: true,
        track: true,
        experiences: true,
      },
    });
    // console.log("resultat",applicants);
    if (!applicants.length) throw new Error("No matches found");
    res.status(200).json(applicants);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

function unique(array: Array<string>) {
  return [...new Set(array)];
}

const getAllLocations = async (req: Request, res: Response) => {
  try {
    const users = await prisma.applicant.findMany({
      // select: {
      //   location: true
      // }
    });
    const desiredLoc: Array<string> = [];
    users.forEach((user) =>
      user.desiredLocation.forEach((loc) => desiredLoc.push(loc))
    );
    const locations = users
      .map((user) => user.location)
      .map((location) => location as string);
    const uniqueLocations = unique(locations.concat(desiredLoc!))
      .filter((location) => location !== null && location !== undefined && location !== '')
      .sort();
    if (!locations.length) throw new Error("No applicants not found!");
    res.status(200).json(uniqueLocations);
  } catch (error: any) {
    console.log(error);
    res.status(500).json();
  }
};

export const applicantControllers = {
  createApplicant,
  getApplicantById,
  updateApplicant,
  deleteApplicant,
  getAllApplicants,
  filterApplicants,
  getTypeofUser,
  getAllLocations,
};
