import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
import dotenv from "dotenv";
import { fetchCityCoordinates } from "./coordinatesController";
dotenv.config();

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

    console.log(location);
    const coordinates = await fetchCityCoordinates(location);

    if (
      recruiterId === undefined ||
      !about ||
      !title ||
      skills.length === 0 ||
      stack.length === 0 ||
      requiredLanguages.length === 0 ||
      !location
    ) {
      res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
      return;
    }

    const vacancy = await prisma.vacancy.create({
      data: {
        recruiter: { connect: { id: +recruiterId } },
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
        currentLocation: [
          coordinates?.lat?.toString() ?? "",
          coordinates?.lng?.toString() ?? "",
        ],
      },
    });

    res.status(201).json({ success: true, data: vacancy });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

const getVacancyById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const vacancy = await prisma.vacancy.findUnique({
      where: { id },
      include: {
        jobTrack: {
          include: {
            Questionaries: true,
          },
        },
      },
    });

    if (!vacancy) {
      res.status(404).json({ success: false, message: "Vacancy not found" });
      return;
    }
    console.log("vacacny by id controller", vacancy);

    res.status(200).json({ success: true, data: vacancy });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getVacancyByRecruiter = async (req: Request, res: Response) => {
  try {
    const recruiterId = parseInt(req.params.recruiterId);
    const vacancies = await prisma.vacancy.findMany({
      where: { recruiterId },
      include: {
        jobTrack: {
          include: {
            Questionaries: true,
          },
        },
      },
    });
    res.status(200).json(vacancies);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
};

const getAllVacancies = async (req: Request, res: Response) => {
  console.log("Inside getAllVacancies");
  try {
    const AllVacancies = await prisma.vacancy.findMany({
      include: {
        jobTrack: {
          include: {
            Questionaries: true,
          },
        },
        recruiter: true,
      },
    });
    res.status(200).json(AllVacancies);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
};

const updateVacancy = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    let coordinates: any = [];
    if (updatedData.location) {
      coordinates = await fetchCityCoordinates(updatedData.location);
    }
    updatedData.currentLocation = [
      coordinates?.lat?.toString() ?? "",
      coordinates?.lng?.toString() ?? "",
    ];
    const updatedVacancy = await prisma.vacancy.update({
      where: { id },
      data: updatedData,
    });
    res.status(200).json(updatedVacancy);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

const deleteVacancy = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.vacancy.delete({
      where: { id },
      include: {
        jobTrack: true,
      },
    });
    res.status(200).json({ message: "Succesfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
const getVacanciesByFilter = async (req: Request, res: Response) => {
  try {
    const filter = req.body;
    console.log(filter, "filters body");

    const filters: any = {};

    if (filter.location?.length > 0) {
      filters.location = {
        contains: filter.location,
        mode: "insensitive",
      };
    }

    if (filter.title?.length > 0) {
      filters.title = {
        contains: filter.title,
        mode: "insensitive",
      };
    }

    if (filter.skills[0]) {
      filters.skills = {
        hasSome: filter.skills,
      };
    }

    if (filter.stack[0]) {
      filters.stack = {
        hasSome: filter.stack,
      };
    }

    if (filter.requiredLanguages[0]) {
      filters.requiredLanguages = {
        hasSome: filter.requiredLanguages,
      };
    }

    if (filter.experience !== null) {
      filters.experience = { gte: filter.experience };
    }

    if (filter.salaryRange !== null) {
      filters.salaryRange = { gte: filter.salaryRange };
    }
    const filteredVacancies = await prisma.vacancy.findMany({
      where: filters,
      include: {
        jobTrack: true,
      },
    });
    res.status(200).json(filteredVacancies);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
// const getVacanciesByFilter = async (req: Request, res: Response) => {
//   try {
//     const {
//       location,
//       experience,
//       workingHours,
//       workingModal,
//       skills,
//       stack,
//       requiredLanguages,
//       salaryRange,
//       title,
//       notDesiredLocation,
//     } = req.query as {
//       location?: string;
//       experience?: string;
//       workingHours?: string;
//       workingModal?: string;
//       skills?: string;
//       stack?: string;
//       requiredLanguages?: string;
//       salaryRange?: string;
//       title?: string;
//       notDesiredLocation?: string;
//     };
//     console.log(req.query);
//     const filter: any = {};
//     if (location) {
//       filter.location = location;
//     }
//     if (experience) {
//       filter.experience = { gte: parseInt(experience) };
//     }
//     if (workingModal) {
//       filter.workingModal = workingModal;
//     }
//     if (workingHours) {
//       filter.workingHours = workingHours;
//     }
//     if (skills) {
//       filter.skills = { hasSome: skills.split(",") };
//     }
//     if (stack) {
//       filter.stack = { hasSome: stack.split(",") };
//     }
//     if (requiredLanguages) {
//       filter.requiredLanguages = {
//         hasSome: requiredLanguages.split(","),
//       };
//     }
//     if (salaryRange) {
//       filter.salaryRange = { gte: parseInt(salaryRange) };
//     }
//     if (title) {
//       filter.title = title;
//     }
//     if (notDesiredLocation) {
//       filter.location = {
//         not: notDesiredLocation,
//       };
//     }

//     const filteredVacancies = await prisma.vacancy.findMany({
//       where: filter,
//       include: {
//         jobTrack: true,
//       },
//     });
//     res.status(200).json(filteredVacancies);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json(error);
//   }
// };

export const vacancyController = {
  createVacancy,
  getVacancyById,
  getVacancyByRecruiter,
  getAllVacancies,
  updateVacancy,
  deleteVacancy,
  getVacanciesByFilter,
};
