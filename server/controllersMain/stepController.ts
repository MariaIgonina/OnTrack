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
    const step = await prisma.step.create({
      data: {
        title: req.body.title,
        durationInMs: parseInt(req.body.durationInMs),
        hidden: false,
        statusStep: false,
        Track: { connect: { id: parseInt(req.body.trackId) } }
      },
    });
    res.json(step).status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
}


async function getStepsbyTrack(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const step = await prisma.step.findMany({
      where: {
        trackId: parseInt(id),
      },
    });
    res.json(step).status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
}

async function deleteStep(req: Request, res: Response) {
  const { id } = req.params;
  console.log(id);
  try {
    const step = await prisma.step.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(step).status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
}

async function updateStepbyId(req: Request, res: Response) {
  const { id } = req.params;
  const { title, actions, durationInMs, hidden, statusStep, questionaries } = req.body;
  console.log(title,hidden);
  try {
    const step = await prisma.step.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: title,
        actions: actions,
        durationInMs: durationInMs,
        hidden: hidden ? JSON.parse(hidden) : undefined,
        statusStep: statusStep ? JSON.parse(statusStep) : undefined,
        questionaries: questionaries,
      },
    });
    res.json(step).status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
}


