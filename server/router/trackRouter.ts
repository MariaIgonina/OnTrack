import { Router, Request, Response } from "express";
import { trackControllers } from "../controllersMain/trackController";

const trackRouter = Router();

// Track routes
trackRouter.post("/createTrack", trackControllers.createTrack);
trackRouter.post("/duplicateTrack", trackControllers.duplicateTrack);
trackRouter.get(
  "/getTracksByVacancy/:vacancyId",
  trackControllers.getTracksByVacancy
);
trackRouter.get(
  "/getTracksByRecruiter/:recruiterId",
  trackControllers.getTracksByRecruiter
);
trackRouter.get(
  "/getTracksByApplicant/:applicantId",
  trackControllers.getTracksByApplicant
);
trackRouter.get("/getTrackById/:trackId", trackControllers.getTrackById);
trackRouter.put("/updatetrack/:id", trackControllers.updatetrackbyId);
trackRouter.delete("/deletetrack/:id", trackControllers.deletetrack);

export default trackRouter;
