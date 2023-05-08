import { Router, Request, Response } from "express";
const router = Router();
import {
  createVacancy,
  deleteVacancy,
  getAllVacancies,
  getVacancyById,
  updateVacancy,
} from "./controllers/vacancyController";
import {
  createMessage,
  deleteMessageById,
  getAllMsgsByTrack,
} from "./controllers/messageController";

router.get("/", (req: Request, res: Response) => {
  res.send("Hello, World! This is the main route");
});

// Vacancy routes
router.post("/vacancy", createVacancy);
router.get("/vacancy/:id", getVacancyById);
router.get("/vacancyall", getAllVacancies);
router.put("/vacancy/:id", updateVacancy);
router.delete("/vacancy/:id", deleteVacancy);
// Message routes
router.post("/message", createMessage);
router.delete("/message/:id", deleteMessageById);
router.get("/message/:trackId", getAllMsgsByTrack);

export default router;
