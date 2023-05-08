import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import dotenv from 'dotenv';
dotenv.config()

const prisma = new PrismaClient();

const createApplicant = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    const response = await prisma.applicant.create({
      data: newUser,
    });
    res.status(201).json(response)
  } catch (error) {
    console.log(error)
    res.status(404).json('All fields are mandatory')
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

}

const deleteApplicant = async (req: Request, res: Response) => {
  
}

export const applicantControllers = {
  createApplicant,
  getApplicantById,
  updateApplicant,
  deleteApplicant
};