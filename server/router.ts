import { Router, Request, Response } from 'express';
import { applicantControllers } from './controllers/applicantControllers'
import { getAccessToken, getUserData } from "./Controllers/authController";

import {
  createVacancy,
  getAllVacancies,
  getVacancyById,
} from "./controllers/vacancyController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello, World! This is the main route");
});

// Applicant routes
router.get('/applicant/:id', applicantControllers.getApplicantById)
router.get('/applicants', applicantControllers.getAllApplicants)
router.post('/createApplicant', applicantControllers.createApplicant)
router.put('/updateApplicant/:id', applicantControllers.updateApplicant)
router.delete('/deleteApplicant/:id', applicantControllers.deleteApplicant)

router.get("/getAccessToken", getAccessToken);
router.get("/getUserData", getUserData);
router.post("/vacancy", createVacancy);
router.get("/vacancy/:id", getVacancyById);
router.get("/vacancyall", getAllVacancies);

export default router;
