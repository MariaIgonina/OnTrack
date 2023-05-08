import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const recruiterController = {
  getRecruiterbyId,
  deleteRecruiterbyId,
  updateRecruiterbyId,
  createRecruiter
};

async function getRecruiterbyId(req: Request, res: Response) {
    const {id}  = req.params;
  try {
    const recruiter = await prisma.recruiter.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.json(recruiter).status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
}

async function deleteRecruiterbyId(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const recruiter = await prisma.recruiter.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(recruiter).status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
}

async function updateRecruiterbyId(req: Request, res: Response) {
    const { id } = req.params;
    const { name, logo, founded, about, externalLinks, headOffice } = req.body;
  try {
    const recruiter = await prisma.recruiter.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        logo: logo,
        founded: founded,
        about: about,
        externalLinks: externalLinks,
        headOffice: headOffice,
      },
    });
    res.json(recruiter).status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
}

async function createRecruiter(req: Request, res: Response) {
    try {
      const recruiter = await prisma.recruiter.create({
        data: {
          name: req.body.name,
          logo: req.body.logo,
          founded: req.body.founded,
          about: req.body.about,
          externalLinks: req.body.externalLinks,
          headOffice: req.body.headOffice,
        },
      });
      res.json(recruiter).status(200);
    } catch (error) {
      console.log(error);
      res.status(400);
    }
  }
