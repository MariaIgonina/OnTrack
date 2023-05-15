import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

async function createTitle(req: Request, res: Response) {
  console.log('!!!!!', req.body)
  try {
    const newTitle = await prisma.education.create({
      data: { ...req.body, Applicant: { connect: { idDB: +req.params.applicantId } } }
    })
    res.status(200).json(newTitle)
  } catch (error) {
    console.log('error creating new education title ', error)
  }
}
async function getAllEducationByApplicantId(req: Request, res: Response) {
  const paramsId: number = +req.params.applicantId
    try {
    const educationArr = await prisma.education.findMany({
      where: {
        applicantIdDB: paramsId
      }
    })
    if (!educationArr.length) throw new Error('No education titles found');
    res.status(200).json(educationArr)
  } catch (error: any) {
    console.log(error);
    res.status(404).json(error.message || error)
  }
}
async function getTitleById(req: Request, res: Response) {
  const titleId = +req.params.titleId;
  try {
    const title = await prisma.education.findUnique({
      where: {
        id: titleId
      }
    })
    res.status(200).json(title);
  } catch (error: any) {
    console.log(error)
    res.status(400).json(error.message || error)
  }
}

async function deleteTitleById(req: Request, res: Response) {
  const titleId = +req.params.titleId;
  try {
    const deleted = await prisma.education.delete({
      where: {
        id: titleId
      }
    })
    res.status(200).json(deleted)
  } catch (error: any) {
    console.log(error)
    res.status(400).json(error.message || error)
  }
}

async function updateTitleById(req: Request, res: Response) {
  const titleId = +req.params.titleId;
  try {
    const updatedTitle = await prisma.education.update({
      where: {
        id: titleId
      },
      data: req.body
    })
    console.log(req.body);
    console.log(updatedTitle)
    if (!updatedTitle) throw new Error('Education title not found');
    res.status(201).json(updatedTitle)
  } catch (error: any) {
    console.log(error)
    res.status(400).json(error.message || error)
  }
}

export const educationController = {
  createTitle,
  getAllEducationByApplicantId,
  getTitleById,
  deleteTitleById,
  updateTitleById,
};
