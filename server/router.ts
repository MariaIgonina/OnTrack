import { Router, Request, Response } from "express";
const router = Router();
import {recruiterController} from "./controllers/recruiterController"
import {
  createVacancy,
  getAllVacancies,
  getVacancyById,
} from "./controllers/vacancyController";

router.get("/", (req: Request, res: Response) => {
  res.send("Hello, World! This is the main route");
});

// Routes for Recruiter Controller
router.get('/recruiter/:id', recruiterController.getRecruiterbyId)
router.post('/createRecruiter', recruiterController.createRecruiter)
router.put('/updateRecruiter/:id', recruiterController.updateRecruiterbyId)
router.delete('/deleteRecruiter/:id', recruiterController.deleteRecruiterbyId)


router.post("/vacancy", createVacancy);
router.get("/vacancy/:id", getVacancyById);
router.get("/vacancyall", getAllVacancies);

export default router;
