import { Router } from "express";
import { questionnaryController } from "../controllersMain/questionnaryController";

const questionnaryRouter = Router();

//Routes for Questionnary controller
questionnaryRouter.post("/createQuestionary", questionnaryController.createQuestionnary);
questionnaryRouter.get("/getQuestionaryByStep/:id",questionnaryController.getQuestionaryByStep);
questionnaryRouter.put("/updateQuestionary/:id", questionnaryController.updateQuestionary);
questionnaryRouter.delete("/deleteQuestionary/:id",questionnaryController.deleteQuestionary);

export default questionnaryRouter