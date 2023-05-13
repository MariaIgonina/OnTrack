import { Router, Request, Response } from "express";
import { applicantControllers } from "../controllersMain/applicantControllers";

const applicantRouter = Router();

// Applicant routes
applicantRouter.get("/applicant/:id", applicantControllers.getApplicantById);
applicantRouter.get("/applicants", applicantControllers.getAllApplicants);
applicantRouter.post("/createApplicant", applicantControllers.createApplicant);
applicantRouter.put("/updateApplicant/:id", applicantControllers.updateApplicant);
applicantRouter.delete("/deleteApplicant/:id", applicantControllers.deleteApplicant);
applicantRouter.get("/filterApplicants/", applicantControllers.filterApplicants)

export default applicantRouter