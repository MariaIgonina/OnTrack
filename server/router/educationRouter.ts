import { Router } from "express";
import { educationController } from "../controllersMain/educationController";


const educationRouter = Router();


// Education routes
educationRouter.post("/createEducationTitle/:applicantId",educationController.createTitle);
educationRouter.get("/education/:applicantId", educationController.getAllEducationByApplicantId);
educationRouter.put("/updateEducationTitle/:titleId",educationController.updateTitleById);
educationRouter.delete("/deleteEducationTitle/:titleId",educationController.deleteTitleById);
educationRouter.get("/getEducationTitle/:titleId", educationController.getTitleById);
  
export default educationRouter