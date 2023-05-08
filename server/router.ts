import { Router, Request, Response } from "express";
import { applicantControllers } from "./Controllers/applicantControllers";
import { getAccessToken, getUserData } from "./Controllers/authController";
import { vacancyController } from "./Controllers/vacancyController";
import { messageController } from "./Controllers/messageController";
import { actionController } from "./Controllers/actionController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello, World! This is the main route");
});

// Applicant routes
router.get("/applicant/:id", applicantControllers.getApplicantById);
router.get("/applicants", applicantControllers.getAllApplicants);
router.post("/createApplicant", applicantControllers.createApplicant);
router.put("/updateApplicant/:id", applicantControllers.updateApplicant);
router.delete("/deleteApplicant/:id", applicantControllers.deleteApplicant);

// Auth routes
router.get("/getAccessToken", getAccessToken);
router.get("/getUserData", getUserData);

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
