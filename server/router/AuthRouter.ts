import { Router } from "express";
import { getAccessToken, getUserData } from "../controllersAuth/authController";
import { googleApiAuth } from "../controllersAuth/googleAuth";

const authRouter = Router();

// Auth routes
authRouter.get("/getAccessToken", getAccessToken);
authRouter.get("/getUserData", getUserData);
// Auth google routs
authRouter.post("/getGoogleUserInfo", googleApiAuth.getGoogleUserInfo);

export default authRouter