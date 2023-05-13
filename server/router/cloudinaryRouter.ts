import { Router, Request, Response } from "express";
import { cloudinaryControllers } from "../controllersMain/cloudinaryController";


const cloudinaryRouter = Router();

// Upload Image to cloudinary
cloudinaryRouter.post("/postToCloudinary", cloudinaryControllers.postImageToCloudinary);
cloudinaryRouter.get("/getFromCloudinary", cloudinaryControllers.getImageFromCloudinary);

export default cloudinaryRouter