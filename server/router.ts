import { Router } from "express";
import { populateDatabase } from "./controllersMain/populateController";
import { cloudinaryControllers } from "./controllersMain/cloudinaryController";
import { googleApiAuth } from "./controllersAuth/googleAuth";
import { codeSandbox } from "./controllersMain/codeSandboxController";

const router = Router();

router.post('/compile', codeSandbox.sendCompile);

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

// router.get("/getNotes/:TrackId", getNotesByTrackId);
router.get("/findUser/:id", applicantControllers.getTypeofUser);

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
router.get("/getTrackById/:trackId", trackControllers.getTrackById);
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
populateRouter.post("/generate", populateDatabase);


export default populateRouter;
