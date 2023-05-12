import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const getNotesByTrackId = async (req: Request, res: Response) => {
  console.log('trackid from be', req.params)
  try {
    const track = await prisma.track.findUnique({
      where: {
        id: +req.params.TrackId,
      },
    });
    const notes = track?.applicantNotes;
    console.log('notes from server', notes)
    return res.status(200).json(notes);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json('server error'+ error)
  }
};

export default getNotesByTrackId;