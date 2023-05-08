import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const controllers = {
  getCompany
};

async function getCompany(req: Request, res: Response) {
  try {
    const companies = await prisma.company.findMany({});
    res.json(companies).status(200);
  } catch (error) {
    
  }
}
