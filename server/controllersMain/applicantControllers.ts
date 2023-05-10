import { Request, Response } from "express";
import { Applicant, PrismaClient } from "@prisma/client";

import dotenv from 'dotenv';
dotenv.config()

const prisma = new PrismaClient();

const createApplicant = async (req: Request, res: Response) => {
  try {
    // Verify email:
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      throw new Error("Invalid email");
    } else if (!req.body.idAuth.length) {
      throw new Error("Invalid idAuth0");
    }
    const response = await prisma.applicant.create({
      data: req.body
    });
    res.status(201).json(response)
  } catch (error: any) {
    console.log(error)
    res.status(404).json(error.message)
  }
}

const getApplicantById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const foundApplicant = await prisma.applicant.findUnique({
      where: {
        idDB: +id
      }
    });
    if (!foundApplicant) throw new Error("Applicant not found!")
    res.status(200).json(foundApplicant);
  } catch (error: any) {
    console.log('error in applicantController, ', error)
    res.status(400).json(error.message);
  }
}

const updateApplicant = async (req: Request, res: Response) => {
  let {
    email, picture, name, familyName, age, phone, location, readyMove, workingHours, workingModal,
    about, video, salaryRange, desiredWorkingModal,
    currentLocation, socialMedia, skillsProf, stack, compLanguages, languages,
    hobbies, desiredLocation, notDesiredLocation
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
    email, picture, name, familyName, age, phone, location, readyMove, workingHours, workingModal,
    about, video, salaryRange, desiredWorkingModal,
    currentLocation, socialMedia, skillsProf, stack, compLanguages, languages,
    hobbies, desiredLocation, notDesiredLocation
  } as Applicant;

  try {
    const response = await prisma.applicant.update({
      where: { idDB: id },
      data: updatedData
    });
    res.status(200).json(response);
  } catch (error: any) {
    console.log(error);
    if (error.meta) {
      error.meta.cause === 'Record to update does not exist' ? res.status(404).json(error.meta.cause)
        : res.status(409).json(error.meta.cause);
    } else res.status(500).json(error)
  }
}

const getAllApplicants = async (req: Request, res: Response) => {
  try {
    const applicants = await prisma.applicant.findMany({});
    console.log(applicants, applicants.length)
    if (!applicants.length) throw new Error("Applicant not found!")
    res.status(200).json(applicants);
  } catch (error: any) {
    console.log(error);
    res.status(500).json()
  }
}

const deleteApplicant = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await prisma.applicant.delete({
      where: {
        idDB: +id
      }
    });
    res.status(204).json(response);
  } catch (error: any) {
    console.log(error)
    if (error.meta.cause === 'Record to delete does not exist') res.status(404).json(error.meta.cause)
    else res.status(409).json(error.meta.cause);
  }
}

const filterApplicants = async (req: Request, res: Response) => {
  const queryObj: any = {}
  let {
    salaryRange,
    languages,
    workingModal,
    workingHours,
    compLanguages,
    readyMove,
    stack,
    skillsProf,
    desiredLocation
  } = req.query as {
    salaryRange?: string,
    languages?: string,
    workingModal?: string,
    workingHours?: string,
    compLanguages?: string,
    readyMove?: string,
    stack?: string,
    skillsProf?: string,
    desiredLocation?: string,
  };

  if (desiredLocation) {
    queryObj.OR = [
      { desiredLocation: { hasSome: String(desiredLocation).split(',') } },
      { location: desiredLocation }
    ]
  }
  if (salaryRange) {
    queryObj.salaryRange = { lte: +salaryRange! };
  }
  if (languages) {
    queryObj.languages = { hasSome: String(languages).split(',') };
  }
  if (workingModal) {
    queryObj.workingModal = workingModal;
  }
  if (workingHours) {
    queryObj.workingHours = workingHours;
  }
  if (compLanguages) {
    queryObj.compLanguages = {
      hasSome: String(compLanguages).split(','),
    };
  }
  if (readyMove) {
    queryObj.readyMove = Boolean(readyMove);
  }
  if (stack) {
    queryObj.stack = {
      hasSome: String(stack).split(','),
    };
  }
  if (skillsProf) {
    queryObj.skillsProf = {
      hasSome: String(skillsProf).split(','),
    };
  }

  try {
    const applicants = await prisma.applicant.findMany({
      where: { ...queryObj }
    })
    if (!applicants.length) throw new Error('No matches found');
    res.status(200).json(applicants);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error.message);
  }
}

export const applicantControllers = {
  createApplicant,
  getApplicantById,
  updateApplicant,
  deleteApplicant,
  getAllApplicants,
  filterApplicants
};