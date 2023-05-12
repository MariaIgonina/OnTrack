import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const stepController = {
  createStep,
  getStepsbyTrack,
  deleteStep,
  updateStepbyId,
};

async function createStep(req: Request, res: Response) {
  try {
    const step = await prisma.step.create({
      data: {
        title: req.body.title,
        type: req.body.type,
        about: req.body.about,
        durationInMs: parseInt(req.body.durationInMs),
        order: req.body.order,
        Track: { connect: { id: parseInt(req.body.trackId) } },
      },
    });
    res.json(step).status(200);
  } catch (error: any) {
    console.log(error);
    res.status(404).json(error.message);
  }
}

async function getStepsbyTrack(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const step = await prisma.step.findMany({
      where: {
        trackId: parseInt(id),
      },
      include: {
        questionaries: true,
      },
    });

    if (!step) throw new Error("Step not found!");

    res.json(step).status(200);
  } catch (error: any) {
    console.log("error in stepController, ", error);
    res.status(400).json(error.message);
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
      include: {
        questionaries: true,
      },
    });

    res.json(step).status(204);
  } catch (error: any) {
    console.log(error);
    if (error.meta.cause === "Record to delete does not exist")
      res.status(404).json(error.meta.cause);
    else res.status(409).json(error.meta.cause);
  }
}

async function updateStepbyId(req: Request, res: Response) {
  const { id } = req.params;
  const { title, actions, durationInMs, hidden, active, questionaries } =
    req.body;
  console.log(title, hidden);
  try {
    const step = await prisma.step.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: title,
        durationInMs: durationInMs,
        hidden: hidden ? JSON.parse(hidden) : undefined,
        active: active ? JSON.parse(active) : undefined,
        questionaries: questionaries,
      },
    });
    res.json(step).status(200);
  } catch (error: any) {
    console.log(error);
    if (error.meta.cause === "Record to update does not exist")
      res.status(404).json(error.meta.cause);
    else res.status(409).json(error.meta.cause);
  }
}
