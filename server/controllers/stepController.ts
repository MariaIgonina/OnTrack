import { PrismaClient } from '@prisma/client'
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const stepController = {
  createStep,
  getStepsbyTrack,
  deleteStep,
  updateStepbyId
};


async function createStep(req: Request, res: Response) {
  try {
    const recruiter = await prisma.step.create({
      data: {
        title: req.body.title,
        durationInMs: req.body.durationInMs,
        hidden: false,
        statusStep: false,
        Track: { connect: { id: req.body.trackId } }
      },
    });
    res.json(recruiter).status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
}


async function getStepsbyTrack(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const recruiter = await prisma.recruiter.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.json(recruiter).status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
}

async function deleteStep(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const recruiter = await prisma.recruiter.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(recruiter).status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
}

async function updateStepbyId(req: Request, res: Response) {
  const { id } = req.params;
  const { name, logo, founded, about, externalLinks, headOffice } = req.body;
  try {
    const recruiter = await prisma.recruiter.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        logo: logo,
        founded: founded,
        about: about,
        externalLinks: externalLinks,
        headOffice: headOffice,
      },
    });
    res.json(recruiter).status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
}


