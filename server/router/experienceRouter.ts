import { Router } from "express";
import { experienceController } from "../controllersMain/experienceController";


const experienceRouter = Router();

// Experience routes
experienceRouter.post("/createExperience/:applicantId",experienceController.createExperience);
experienceRouter.get("/experience/:applicantId", experienceController.getAllExperienceByApplicantId);
experienceRouter.put("/updateExperience/:experienceId",experienceController.updateExperienceById);
experienceRouter.delete("/deleteExperience/:experienceId",experienceController.deleteExperienceById);
experienceRouter.get("/getExperience/:experienceId",experienceController.getExperienceById);

export default experienceRouter