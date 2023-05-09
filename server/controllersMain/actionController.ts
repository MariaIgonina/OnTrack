// import { PrismaClient } from "@prisma/client";
// import { Request, Response } from "express";
// const prisma = new PrismaClient();
// import dotenv from "dotenv";
// dotenv.config();

// const createActionbyStep = async (req: Request, res: Response) => {
//   try {
//     const { stepId, name, scheduleDate } = req.body;
//     if (!stepId || !name || !scheduleDate) {
//       res
//         .status(400)
//         .json({ success: false, message: "Missing required fields" });
//       return;
//     }
//     const actionByStep = await prisma.action.create({
//       data: {
//         action: { connect: { id: stepId } },
//         name,
//         scheduleDate,
//       },
//     });
//     res.status(201).json({ success: true, data: actionByStep });
//   } catch (error: any) {
//     console.error(error);
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

// const deleteAction = async (req: Request, res: Response) => {
//   try {
//     const id = parseInt(req.params.id);
//     await prisma.action.delete({ where: { id } });
//     res.status(200).json({ success: true, message: "Message deleted" });
//   } catch (error: any) {
//     console.error(error);
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

// const updateAction = async (req: Request, res: Response) => {
//   try {
//     const id = parseInt(req.params.id);
//     const updatedData = req.body;
//     const updatedAction = await prisma.action.update({
//       where: { id },
//       data: updatedData,
//     });
//     res.status(200).json(updatedAction);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json(error);
//   }
// };

// const getAllActionsByStep = async (req: Request, res: Response) => {
//   try {
//     const stepId = parseInt(req.params.stepId);
//     console.log(stepId);
//     const actionsByStep = await prisma.action.findMany({
//       where: { stepId },
//     });
//     res.status(200).json(actionsByStep);
//   } catch (error) {
//     console.error(error);
//     res.status(404).json(error);
//   }
// };

// export const actionController = {
//   createActionbyStep,
//   getAllActionsByStep,
//   updateAction,
//   deleteAction,
// };
