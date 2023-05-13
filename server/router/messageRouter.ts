import { Router } from "express";
import { messageController } from "../controllersMain/messageController";


const messageRouter = Router();

// Message routes
messageRouter.post("/createMessage", messageController.createMessage);
messageRouter.delete("/deleteMessage/:id", messageController.deleteMessageById);
messageRouter.get("/messagesByTrack/:trackId", messageController.getAllMsgsByTrack);
messageRouter.get("/messagesByFilter", messageController.getMessagesByFilter);

export default messageRouter