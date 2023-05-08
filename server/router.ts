import { Router, Request, Response } from "express";
import { applicantControllers } from "./controllersMain/applicantControllers";
import { vacancyController } from "./controllersMain/vacancyController";
import { messageController } from "./controllersMain/messageController";
import { actionController } from "./controllersMain/actionController";
import { recruiterController } from "./controllersMain/recruiterController";
import { trackControllers } from "./controllersMain/trackController";
import { stepController } from "./controllersMain/stepController";
import { questionnaryController } from "./controllersMain/questionnaryController";
import { getAccessToken, getUserData } from "./controllersAuth/authController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello, World! This is the main route");
});

// Routes for Recruiter controller
router.get("/recruiter/:id", recruiterController.getRecruiterbyId);
router.post("/createRecruiter", recruiterController.createRecruiter);
router.put("/updateRecruiter/:id", recruiterController.updateRecruiterbyId);
router.delete("/deleteRecruiter/:id", recruiterController.deleteRecruiterbyId);

// Routes for Step controller
router.post("/createStep", stepController.createStep);
router.get("/getStep/:id", stepController.getStepsbyTrack);
router.put("/updateStep/:id", stepController.updateStepbyId);
router.delete("/deleteStep/:id", stepController.deleteStep);

//Routes for Questionnary controller
router.post("/createQuestionary", questionnaryController.createQuestionnary);
router.get(
  "/getQuestionaryByStep/:id",
  questionnaryController.getQuestionaryByStep
);
router.put("/updateQuestionary/:id", questionnaryController.updateQuestionary);
router.delete(
  "/deleteQuestionary/:id",
  questionnaryController.deleteQuestionary
);

// Applicant routes
router.get("/applicant/:id", applicantControllers.getApplicantById);
router.get("/applicants", applicantControllers.getAllApplicants);
router.post("/createApplicant", applicantControllers.createApplicant);
router.put("/updateApplicant/:id", applicantControllers.updateApplicant);
router.delete("/deleteApplicant/:id", applicantControllers.deleteApplicant);

// Auth routes
router.get("/getAccessToken", getAccessToken);
router.get("/getUserData", getUserData);

// Track routes
router.post("/createTrack", trackControllers.createTrack);
router.get(
  "/getTracksByVacancy/:vacancyId",
  trackControllers.getTracksByVacancy
);
router.get(
  "/getTracksByRecruiter/:recruiterId",
  trackControllers.getTracksByRecruiter
);
router.get(
  "/getTracksByApplicant/:applicantId",
  trackControllers.getTracksByApplicant
);
router.put("/updatetrack/:id", trackControllers.updatetrackbyId);
router.delete("/deletetrack/:id", trackControllers.deletetrack);

// Vacancy routes
router.post("/vacancy", vacancyController.createVacancy);
router.get("/vacancy/:id", vacancyController.getVacancyById);
router.get("/vacancyall", vacancyController.getAllVacancies);
router.put("/vacancy/:id", vacancyController.updateVacancy);
router.delete("/vacancy/:id", vacancyController.deleteVacancy);

// Message routes
router.post("/message", messageController.createMessage);
router.delete("/message/:id", messageController.deleteMessageById);
router.get("/message/:trackId", messageController.getAllMsgsByTrack);

// Action routes
router.get("/action/step/:stepId", actionController.getAllActionsByStep);
router.post("/action", actionController.createActionbyStep);
router.put("/action/:id", actionController.updateAction);
router.delete("/action/:id", actionController.deleteAction);

export default router;
