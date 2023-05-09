import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
import dotenv from "dotenv";
import { start } from "repl";
dotenv.config();

const createMessage = async (req: Request, res: Response) => {
  try {
    const { trackId, text, date, files, stepId } = req.body;
    console.log(req.body);
    if (!trackId || !text || !date || !files || !stepId) {
      res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
      return;
    }
    const message = await prisma.message.create({
      data: {
        track: { connect: { id: trackId } },
        text,
        date,
        files: { set: files },
        stepId,
      },
    });
    res.status(201).json({ success: true, data: message });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteMessageById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.message.delete({ where: { id } });
    res.status(200).json({ message: "Message deleted" });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

const getAllMsgsByTrack = async (req: Request, res: Response) => {
  try {
    const trackId = parseInt(req.params.trackId);
    const messages = await prisma.message.findMany({
      where: { trackId },
      orderBy: { date: "asc" },
    });
    res.status(200).json({ success: true, data: messages });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

const getMessagesByFilter = async (req: Request, res: Response) => {
  try {
    const { trackId, text, startDate, files, stepId } = req.query as {
      trackId?: string;
      text?: string;
      startDate?: string;
      files?: string;
      stepId?: string;
    };

    const filter: any = {};

    if (trackId) {
      filter.trackId = parseInt(trackId);
    }
    if (text) {
      filter.text = { contains: text };
    }
    if (startDate) {
      filter.date = {
        gte: new Date(startDate),
      };
    }
    if (files) {
      filter.files = { hasSome: files.split(",") };
    }
    if (stepId) {
      filter.stepId = parseInt(stepId);
    }

    const filteredMessages = await prisma.message.findMany({
      where: filter,
    });
    res.status(200).json(filteredMessages);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export const messageController = {
  createMessage,
  deleteMessageById,
  getAllMsgsByTrack,
  getMessagesByFilter,
};
