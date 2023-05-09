import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

async function createTitle(req: Request, res: Response) {
  try {
    await prisma.education.create({
      data: { ...req.body, applicant: { connect: { idDB: +req.params.applicantId } } }
    })
  } catch (error) {
    console.log('error creating new expirience ', error)
  }
}
async function getAllEducationByApplicantId(req: Request, res: Response) {
  const paramsId = +req.body.appId
  try {
    await prisma.education.findMany({
      where: {
        applicantId
      }
    })
  } catch (error) {

  }
}
async function getTitleById(req: Request, res: Response) {
  try {
  } catch (error) {

  }
}
async function deleteTitleById(req: Request, res: Response) {
  try {
  } catch (error) {

  }
}
async function updateTitleById(req: Request, res: Response) {
  try {
  } catch (error) {

  }
}



export const educationController = {
  createTitle,
  getAllEducationByApplicantId,
  getTitleById,
  deleteTitleById,
  updateTitleById,
};
