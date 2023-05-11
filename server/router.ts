import { Router, Request, Response } from "express";
import { applicantControllers } from "./controllersMain/applicantControllers";
import { vacancyController } from "./controllersMain/vacancyController";
import { messageController } from "./controllersMain/messageController";
// import { actionController } from "./controllersMain/actionController";
import { recruiterController } from "./controllersMain/recruiterController";
import { trackControllers } from "./controllersMain/trackController";
import { stepController } from "./controllersMain/stepController";
import { questionnaryController } from "./controllersMain/questionnaryController";
import { getAccessToken, getUserData } from "./controllersAuth/authController";
import { educationController } from "./controllersMain/educationController";
import { experienceController } from "./controllersMain/experienceController";
import { populateDatabase } from "./controllersMain/populateController";
import { googleApiAuth } from "./controllersAuth/googleAuth";

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
router.get("/filterApplicants/", applicantControllers.filterApplicants);

// Auth routes
router.get("/getAccessToken", getAccessToken);
router.get("/getUserData", getUserData);
// Auth google routs
router.post("/getGoogleUserInfo", googleApiAuth.getGoogleUserInfo);

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
router.post("/createVacancy", vacancyController.createVacancy);
router.get("/vacancy/:id", vacancyController.getVacancyById);
router.get("/vacanciesAll", vacancyController.getAllVacancies);
router.get(
  "/vacanciesByRecruiter/:recruiterId",
  vacancyController.getVacancyByRecruiter
);
router.get("/vacanciesByFilter", vacancyController.getVacanciesByFilter);
router.put("/updateVacancy/:id", vacancyController.updateVacancy);
router.delete("/deleteVacancy/:id", vacancyController.deleteVacancy);

// Message routes
router.post("/createMessage", messageController.createMessage);
router.delete("/deleteMessage/:id", messageController.deleteMessageById);
router.get("/messagesByTrack/:trackId", messageController.getAllMsgsByTrack);
router.get("/messagesByFilter", messageController.getMessagesByFilter);

// Populate
router.post("/generate", populateDatabase);
// Action routes
// router.get("/actionsByStep/:stepId", actionController.getAllActionsByStep);
// router.post("/createAction", actionController.createActionbyStep);
// router.put("/updateAction/:id", actionController.updateAction);
// router.delete("/deleteAction/:id", actionController.deleteAction);

// Education routes
router.post(
  "/createEducationTitle/:applicantId",
  educationController.createTitle
);
router.get(
  "/education/:applicantId",
  educationController.getAllEducationByApplicantId
);
router.put(
  "/updateEducationTitle/:titleId",
  educationController.updateTitleById
);
router.delete(
  "/deleteEducationTitle/:titleId",
  educationController.deleteTitleById
);
router.get("/getEducationTitle/:titleId", educationController.getTitleById);

// Experience routes
router.post(
  "/createExperience/:applicantId",
  experienceController.createExperience
);
router.get(
  "/experience/:applicantId",
  experienceController.getAllExperienceByApplicantId
);
router.put(
  "/updateExperience/:experienceId",
  experienceController.updateExperienceById
);
router.delete(
  "/deleteExperience/:experienceId",
  experienceController.deleteExperienceById
);
router.get(
  "/getExperience/:experienceId",
  experienceController.getExperienceById
);

export default router;
