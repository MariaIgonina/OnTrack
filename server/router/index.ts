import { Router, Request, Response } from "express";
import applicantRouter from "./applicantRouter";
import authRouter from "./AuthRouter";
import cloudinaryRouter from "./cloudinaryRouter";
import educationRouter from "./educationRouter";
import experienceRouter from "./experienceRouter";
import messageRouter from "./messageRouter";
import questionnaryRouter from "./questionaryRouter";
import recruiterRouter from "./recruiterRouter";

import trackRouter from "./trackRouter";
import vacancyRouter from "./vacancyRouter";

const mainRouter = Router();

mainRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello, World! This is the main route");
});

mainRouter.use("", applicantRouter);
mainRouter.use("", authRouter);
mainRouter.use("", cloudinaryRouter);
mainRouter.use("", educationRouter);
mainRouter.use("", experienceRouter);
mainRouter.use("", messageRouter);
mainRouter.use("", questionnaryRouter);
mainRouter.use("", recruiterRouter);
mainRouter.use("", trackRouter);
mainRouter.use("", vacancyRouter);

export default mainRouter;
