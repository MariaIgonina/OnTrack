import { Router, Request, Response } from 'express';
import { applicantControllers } from './controllers/applicantControllers'
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
router.post('/createApplicant', applicantControllers.createApplicant)
router.put('/applicant/:id')

router.post("/vacancy", createVacancy);
router.get("/vacancy/:id", getVacancyById);
router.get("/vacancyall", getAllVacancies);

export default router;
