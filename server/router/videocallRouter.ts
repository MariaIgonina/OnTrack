import { Router, Request, Response } from "express";
import { videocallController } from "../controllersMain/videoCallController";

const videocallRouter = Router();

// Track routes
videocallRouter.post("/createTrack", videocallController.createVideocall);
videocallRouter.get("/getTracksByVacancy/:vacancyId", videocallController.getAllVideocallsByTrack);
videocallRouter.get("/getTrackById/:trackId", videocallController.getVideocallById);
videocallRouter.put("/updatetrack/:id", videocallController.updateVideocall);
videocallRouter.delete("/deletetrack/:id", videocallController.deleteVideocall);

export default videocallRouter