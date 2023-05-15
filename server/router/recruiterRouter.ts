import { Router } from "express";
import { recruiterController } from "../controllersMain/recruiterController";

const recruiterRouter = Router();

// Routes for Recruiter controller
recruiterRouter.get("/recruiter/:id", recruiterController.getRecruiterbyId);
recruiterRouter.post("/createRecruiter", recruiterController.createRecruiter);
recruiterRouter.put("/updateRecruiter/:id", recruiterController.updateRecruiterbyId);
recruiterRouter.delete("/deleteRecruiter/:id", recruiterController.deleteRecruiterbyId);

export default recruiterRouter
