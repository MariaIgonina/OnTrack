import {recruiterController} from "./controllers/recruiterController"
import { Router, Request, Response } from 'express';
import { applicantControllers } from './controllers/applicantControllers'
import { getAccessToken, getUserData } from "./controllers/authController";
import { trackControllers } from "./controllers/trackController";
import { questionnaryController } from "./controllers/questionnaryController";

import {
  createVacancy,
  deleteVacancy,
  getAllVacancies,
  getVacancyById,
  updateVacancy,
} from "./controllers/vacancyController";
import {stepController} from "./controllers/stepController"
import {
  createMessage,
  deleteMessageById,
  getAllMsgsByTrack,
} from "./controllers/messageController";

const router = Router();

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

//Routes for Questionnary controller
router.post('/createQuestionary', questionnaryController.createQuestionnary )
router.get('/getQuestionaryByStep/:id', questionnaryController.getQuestionaryByStep )
router.put('/updateQuestionary/:id', questionnaryController.updateQuestionary )
router.delete('/deleteQuestionary/:id', questionnaryController.deleteQuestionary )

// Applicant routes
router.get('/applicant/:id', applicantControllers.getApplicantById)
router.get('/applicants', applicantControllers.getAllApplicants)
router.post('/createApplicant', applicantControllers.createApplicant)
router.put('/updateApplicant/:id', applicantControllers.updateApplicant)
router.delete('/deleteApplicant/:id', applicantControllers.deleteApplicant)

router.get("/getAccessToken", getAccessToken);
router.get("/getUserData", getUserData);

// Track routes
router.post('/createTrack', trackControllers.createTrack);
router.get('/getTracksByVacancy/:vacancyId', trackControllers.getTracksByVacancy)
router.get('/getTracksByRecruiter/:recruiterId', trackControllers.getTracksByRecruiter)
router.get('/getTracksByApplicant/:applicantId', trackControllers.getTracksByApplicant)
router.put("/updatetrack/:id", trackControllers.updatetrackbyId);
router.delete("/deletetrack/:id", trackControllers.deletetrack);

// Vacancy routes
router.post("/vacancy", createVacancy);
router.get("/vacancy/:id", getVacancyById);
router.get("/vacancyall", getAllVacancies);
router.put("/vacancy/:id", updateVacancy);
router.delete("/vacancy/:id", deleteVacancy);

// Message routes
router.post("/message", createMessage);
router.delete("/message/:id", deleteMessageById);
router.get("/message/:trackId", getAllMsgsByTrack);



export default router;
