import { Router } from "express";
import { fetchCitySuggestions } from "../controllersMain/coordinatesController";

const cityRouter = Router();

cityRouter.get("/city-suggestions", fetchCitySuggestions);

export default cityRouter;
