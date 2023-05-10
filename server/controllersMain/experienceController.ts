import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

async function createExperience(req: Request, res: Response) {
  try {
    await prisma.experience.create({
      data: { ...req.body, applicant: { connect: { idDB: +req.params.applicantId } } }
    })
  } catch (error) {
    console.log('error creating new experience ', error)
  }
}
async function getAllExperienceByApplicantId(req: Request, res: Response) {
  const paramsId: number = +req.body.applicantId
  try {
    const experienceArr = await prisma.experience.findMany({
      where: {
        applicantId: paramsId
      }
    })
    if (!experienceArr.length) throw new Error('No experience found');
    res.status(200).json(experienceArr)
  } catch (error: any) {
    console.log(error);
    res.status(404).json(error.message || error)
  }
}
async function getExperienceById(req: Request, res: Response) {
  const experienceId = +req.params.experienceId;
  try {
    const experience = await prisma.experience.findUnique({
      where: {
        id: experienceId
      }
    })
    res.status(200).json(experience);
  } catch (error: any) {
    console.log(error)
    res.status(400).json(error.message || error)
  }
}

async function deleteExperienceById(req: Request, res: Response) {
  const experienceId = +req.params.experienceId;
  try {
    await prisma.experience.delete({
      where: {
        id: experienceId
      }
    })
    res.status(200).send(true)
  } catch (error: any) {
    console.log(error)
    res.status(400).json(error.message || error)
  }
}

async function updateExperienceById(req: Request, res: Response) {
  const experienceId = +req.params.experienceId;
  try {
    const updatedExperience = await prisma.experience.update({
      where: {
        id: experienceId
      },
      data: req.body
    })
    if (!updatedExperience) throw new Error('title not found');
    res.status(201).json(updatedExperience)
  } catch (error: any) {
    console.log(error)
    res.status(400).json(error.message || error)
  }
}

export const experienceController = {
  createExperience,
  getAllExperienceByApplicantId,
  getExperienceById,
  deleteExperienceById,
  updateExperienceById,
};
