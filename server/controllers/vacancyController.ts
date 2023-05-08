import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
import dotenv from "dotenv";
dotenv.config();

export {
  createVacancy,
  getVacancyById,
  getVacancyByRecruiter,
  getAllVacancies,
  updateVacancy,
  deleteVacancy,
};

const createVacancy = async (req: Request, res: Response) => {
  try {
    const {
      recruiterId,
      about,
      title,
      workingHours,
      workingModal,
      skills,
      stack,
      requiredLanguages,
      experience,
      location,
      salaryRange,
    } = req.body;

    console.log(req.body);

    if (
      recruiterId === undefined ||
      !about ||
      !title ||
      !workingHours ||
      !workingModal ||
      !skills ||
      !stack ||
      !requiredLanguages ||
      experience === undefined ||
      !location ||
      salaryRange === undefined
    ) {
      res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
      return;
    }

    const vacancy = await prisma.vacancy.create({
      data: {
        recruiter: { connect: { id: recruiterId } },
        about,
        title,
        workingHours,
        workingModal,
        skills: { set: skills },
        stack: { set: stack },
        requiredLanguages: { set: requiredLanguages },
        experience,
        location,
        salaryRange,
      },
    });

    res.status(201).json({ success: true, data: vacancy });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getVacancyById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const vacancy = await prisma.vacancy.findUnique({ where: { id } });

    if (!vacancy) {
      res.status(404).json({ success: false, message: "Vacancy not found" });
      return;
    }

    res.status(200).json({ success: true, data: vacancy });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getVacancyByRecruiter = async (req: Request, res: Response) => {
  try {
    const recruiterId = parseInt(req.params.recruiterId);
    const vacancies = await prisma.vacancy.findMany({ where: { recruiterId } });
    res.status(200).json(vacancies);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getAllVacancies = async (req: Request, res: Response) => {
  try {
    const AllVacancies = await prisma.vacancy.findMany();
    res.status(200).json(AllVacancies);
  } catch (error) {
    res.status(404).json(error);
  }
};

const updateVacancy = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    const updatedVacancy = await prisma.vacancy.update({
      where: { id },
      data: updatedData,
    });
    res.status(200).json(updateVacancy);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteVacancy = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.vacancy.delete({ where: { id } });
    res.status(200);
  } catch (error) {
    res.status(400).json(error);
  }
};
