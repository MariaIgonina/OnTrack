import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import dotenv from 'dotenv';
dotenv.config()

const prisma = new PrismaClient();

const createApplicant = async (req: Request, res: Response) => {
  try {
    // Verify email:
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      throw new Error("Invalid email");
    } else if (!req.body.idAuth0.length) {
      throw new Error("Invalid idAuth0");
    }
    const response = await prisma.applicant.create({
      data: req.body
    });
    res.status(201).json(response)
  } catch (error: any) {
    console.log(error)
    res.status(404).json(error.message)
  }
}

const getApplicantById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const foundApplicant = await prisma.applicant.findUnique({
      where: {
        idDB: +id
      }
    });
    console.log(foundApplicant)
    if (!foundApplicant) throw new Error("Applicant not found!")
    res.status(200).json(foundApplicant);
  } catch (error: any) {
    console.log('error in applicantController, ', error)
    res.status(400).json(error.message);
  }
}

const updateApplicant = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const response = await prisma.applicant.update({
      where: {
        idDB: +id
      },
      data: updatedData,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
}

const deleteApplicant = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const response = await prisma.applicant.delete({
      where: {
        idDB: +id
      }
    });
    res.status(204).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
}

export const applicantControllers = {
  createApplicant,
  getApplicantById,
  updateApplicant,
  deleteApplicant
};