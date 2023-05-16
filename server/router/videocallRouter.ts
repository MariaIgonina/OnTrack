import { Router, Request, Response } from "express";
import { videocallController } from "../controllersMain/videoCallController";

const videocallRouter = Router();

// Track routes
videocallRouter.post("/createVideocall", videocallController.createVideocall);
videocallRouter.get("/getAllVideocalsByTrack/:vacancyId", videocallController.getAllVideocallsByTrack);
videocallRouter.get("/getVideocallById/:trackId", videocallController.getVideocallById);
videocallRouter.put("/updateVideocall/:id", videocallController.updateVideocall);
videocallRouter.delete("/deleteVideocall/:id", videocallController.deleteVideocall);

export default videocallRouter