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
  } catch (error: any) {
    console.log(error);
    if (error.meta.cause === 'Record to update does not exist') res.status(404).json(error.meta.cause)
    else res.status(409).json(error.meta.cause);
  }
}

const getAllApplicants = async (req: Request, res: Response) => {
  try {
    const applicants = await prisma.applicant.findMany({});
    console.log(applicants, applicants.length)
    if (!applicants.length) throw new Error("Applicant not found!")
    res.status(200).json(applicants);
  } catch (error: any) {
    console.log(error);
    res.status(500).json()
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
  } catch (error: any) {
    console.log(error)
    if (error.meta.cause === 'Record to delete does not exist') res.status(404).json(error.meta.cause)
    else res.status(409).json(error.meta.cause);
  }
}

export const applicantControllers = {
  createApplicant,
  getApplicantById,
  updateApplicant,
  deleteApplicant,
  getAllApplicants
};