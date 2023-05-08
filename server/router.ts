import { Router, Request, Response } from "express";
const router = Router();
import {recruiterController} from "./controllers/recruiterController"
import {
  createVacancy,
  getAllVacancies,
  getVacancyById,
} from "./controllers/vacancyController";
import {stepController} from "./controllers/stepController"

router.get("/", (req: Request, res: Response) => {
  res.send("Hello, World! This is the main route");
});

// Routes for Recruiter controller
router.get('/recruiter/:id', recruiterController.getRecruiterbyId)
router.post('/createRecruiter', recruiterController.createRecruiter)
router.put('/updateRecruiter/:id', recruiterController.updateRecruiterbyId)
router.delete('/deleteRecruiter/:id', recruiterController.deleteRecruiterbyId)

// Routes for Step controller
router.post('/createStep', stepController.createStep )
router.get('/getStep/:id', stepController.getStepsbyTrack )
router.put('/updateStep/:id', stepController.updateStepbyId )
router.delete('/deleteStep/:id', stepController.deleteStep )

router.post("/vacancy", createVacancy);
router.get("/vacancy/:id", getVacancyById);
router.get("/vacancyall", getAllVacancies);

export default router;
