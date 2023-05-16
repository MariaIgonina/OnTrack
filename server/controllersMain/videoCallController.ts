import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();


async function createVideocall(req: Request, res: Response) {
  try {
    const videocall = await prisma.videocall.create({
      data: {
        date: req.body.date,
        hidden: Boolean(req.body.hidden),
        Track: { connect: { id: parseInt(req.body.trackId) } },
        link: req.body.link || '',
        type: req.body.type,
        order: req.body.order,
        title: req.body.title
      },
    });
    res.json(videocall).status(201);
  } catch (error: any) {
    console.log(error);
    if (
      error.meta.cause ===
      "No 'track' record(s) (needed to inline the relation on 'Videocall' record(s)) was found for a nested connect on one-to-many relation 'QuestionaryToStep'."
      )
      res.status(404).json(error.meta.cause);
    res.status(404).json(error.message);
  }
}

async function getAllVideocallsByTrack(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const videocall = await prisma.videocall.findMany({
      where: {
        trackId: parseInt(id),
      },
    });
    
    if (!videocall) throw new Error("Videocalls not found!");
    res.json(videocall).status(200);
  } catch (error: any) {
    console.log("error in videocallController, ", error);
    res.status(400).json(error.message);
  }
}

async function getVideocallById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const videocall = await prisma.videocall.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!videocall) throw new Error("Videocall not found!");
    res.json(videocall).status(200);
  } catch (error: any) {
    console.log("error in videocallController, ", error);
    res.status(400).json(error.message);
  }
}

async function deleteVideocall(req: Request, res: Response) {
  const { id } = req.params;
  console.log('videocall id to delete -> ', id);
  try {
    const videocall = await prisma.videocall.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(videocall).status(204);
  } catch (error: any) {
    console.log(error);
    if (error.meta.cause === "Videocall to delete does not exist")
    res.status(404).json(error.meta.cause);
    else res.status(409).json(error.meta.cause);
  }
}

async function updateVideocall(req: Request, res: Response) {
  const { id } = req.params;
  const { link, title, order, checked, date} = req.body;
  
  try {
    const videocall = await prisma.videocall.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...(link !== undefined && { link }),
        ...(title !== undefined && { title }),
        ...(order !== undefined && { order }),
        ...(checked !== undefined && { checked }),
        ...(date !== undefined && { date }),
      },
    });
    res.json(videocall).status(200);
  } catch (error: any) {
    console.log('error in videocallControllers', error);
    if (error.meta.cause === "Videocall to update does not exist")
    res.status(404).json(error.meta.cause);
    else res.status(409).json(error.meta.cause);
  }
}

export const videocallController = {
  createVideocall,
  deleteVideocall,
  updateVideocall,
  getAllVideocallsByTrack,
  getVideocallById
};