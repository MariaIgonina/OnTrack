import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const questionnaryController = {
  createQuestionnary,
  deleteQuestionary,
  updateQuestionary,
  getQuestionaryByStep,
};

async function createQuestionnary(req: Request, res: Response) {
  try {
    const questionary = await prisma.questionary.create({
      data: {
        questions: req.body.questions,
        answer: req.body.answer,
        date: req.body.date,
        hidden: Boolean(req.body.hidden),
        Track: { connect: { id: parseInt(req.body.trackid) } },
        order: req.body.order,
        // checked: Boolean(req.body.checked)
      },
    });
    res.json(questionary).status(201);
  } catch (error: any) {
    console.log(error);
    if (
      error.meta.cause ===
      "No 'Step' record(s) (needed to inline the relation on 'Questionary' record(s)) was found for a nested connect on one-to-many relation 'QuestionaryToStep'."
    )
      res.status(404).json(error.meta.cause);
    res.status(404).json(error.message);
  }
}

async function getQuestionaryByStep(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const questionary = await prisma.questionary.findMany({
      where: {
        trackId: parseInt(id),
      },
    });

    if (!questionary) throw new Error("Questionnary not found!");

    res.json(questionary).status(200);
  } catch (error: any) {
    console.log("error in questionnaryController, ", error);
    res.status(400).json(error.message);
  }
}

async function deleteQuestionary(req: Request, res: Response) {
  const { id } = req.params;
  console.log(id);
  try {
    const questionary = await prisma.questionary.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json(questionary).status(204);
  } catch (error: any) {
    console.log(error);
    if (error.meta.cause === "Record to delete does not exist")
      res.status(404).json(error.meta.cause);
    else res.status(409).json(error.meta.cause);
  }
}

async function updateQuestionary(req: Request, res: Response) {
  const { id } = req.params;
  const { questions, answer, date } = req.body;

  try {
    const questionary = await prisma.questionary.update({
      where: {
        id: parseInt(id),
      },
      data: {
        questions: questions,
        answer: answer,
        date: date,
      },
    });
    res.json(questionary).status(200);
  } catch (error: any) {
    console.log(error);
    if (error.meta.cause === "Record to update does not exist")
      res.status(404).json(error.meta.cause);
    else res.status(409).json(error.meta.cause);
  }
}
