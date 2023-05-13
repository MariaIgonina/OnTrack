import { Router } from "express";
import { populateDatabase } from "./controllersMain/populateController";

const populateRouter = Router();

// Populate
populateRouter.post("/generate", populateDatabase);


export default populateRouter;
