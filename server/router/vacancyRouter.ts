import { Router, Request, Response } from "express";
import { vacancyController } from "../controllersMain/vacancyController";

const vacancyRouter = Router();

// Vacancy routes
vacancyRouter.post("/createVacancy", vacancyController.createVacancy);
vacancyRouter.get("/vacancy/:id", vacancyController.getVacancyById);
vacancyRouter.get("/vacanciesAll", vacancyController.getAllVacancies);
vacancyRouter.get(
  "/vacanciesByRecruiter/:recruiterId",
  vacancyController.getVacancyByRecruiter
);
vacancyRouter.post(
  "/vacanciesByFilter",
  vacancyController.getVacanciesByFilter
);
vacancyRouter.put("/updateVacancy/:id", vacancyController.updateVacancy);
vacancyRouter.delete("/deleteVacancy/:id", vacancyController.deleteVacancy);

export default vacancyRouter;
