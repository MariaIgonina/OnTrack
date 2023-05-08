import { Router, Request, Response } from "express";
const router = Router();
import { getAccessToken, getUserData } from "./Controllers/authController";

import {
  createVacancy,
  getAllVacancies,
  getVacancyById,
} from "./controllers/vacancyController";

router.get("/", (req: Request, res: Response) => {
  res.send("Hello, World! This is the main route");
});

router.get("/getAccessToken", getAccessToken);
router.get("/getUserData", getUserData);
router.post("/vacancy", createVacancy);
router.get("/vacancy/:id", getVacancyById);
router.get("/vacancyall", getAllVacancies);

export default router;
