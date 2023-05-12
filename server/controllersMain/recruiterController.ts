import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";


const prisma = new PrismaClient();

export const recruiterController = {
  getRecruiterbyId,
  deleteRecruiterbyId,
  updateRecruiterbyId,
  createRecruiter,
};

async function getRecruiterbyId(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const recruiter = await prisma.recruiter.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.json(recruiter).status(200);
  } catch (error: any) {
    console.log("error in recruiterController, ", error);
    res.status(400).json(error.message);
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
    res.json(recruiter).status(204);
  } catch (error: any) {
    console.log(error);
    if (error.meta.cause === "Record to delete does not exist")
      res.status(404).json(error.meta.cause);
    else res.status(409).json(error.meta.cause);
  }
}

async function updateRecruiterbyId(req: Request, res: Response) {
  console.log("update called");
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
  } catch (error: any) {
    console.log(error);
    if (error.meta.cause === "Record to update does not exist")
      res.status(404).json(error.meta.cause);
    else res.status(409).json(error.meta.cause);
  }
}

async function createRecruiter(req: Request, res: Response) {
  console.log("heeeeere", req.body);
  try {
    const recruiter = await prisma.recruiter.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        picture: req.body.picture,
        idAuth: req.body.idAuth,
        recruiterName: req.body.recruiterName,
        logo: req.body.logo,
        founded: req.body.founded,
        about: req.body.about,
        externalLinks: req.body.externalLinks,
        headOffice: req.body.headOffice,
      },
    });
    res.json(recruiter).status(201);
  } catch (error: any) {
    console.log(error);
    if (error.meta.target[0] === "email" || error.meta.target[0] === "idAuth") {
      try {
        const foundRecruiter = await prisma.recruiter.findUnique({
          where: {
            idAuth: req.body.idAuth,
          },
        });
        console.log("this is from the BE", foundRecruiter);
        res.status(200).json(foundRecruiter);
      } catch (error) {
        res.status(500).json("Internal server error" + error);
      }
    } else {
      res.status(404).json(error.message);
    }
  }
}
