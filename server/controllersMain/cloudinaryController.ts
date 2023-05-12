import { Request, Response } from "express";
import { cloudinary } from "../utils/cloudinary";

const postImageToCloudinary = async (req: Request, res: Response) => {
  try {
    console.log("post function called");
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "dev_setups",
    });
    console.log("here I am", uploadResponse);
    res.json(uploadResponse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "wrong" });
  }
};

const getImageFromCloudinary = async (req: Request, res: Response) => {
  try {
    const { resources } = await cloudinary.search
      .expression("folder:dev_setups")
      .sort_by("public_id", "desc")
      .max_results(4)
      .execute();
      console.log(resources)
    
      res.send(resources)
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "wrong" });
  }
};

export const cloudinaryControllers = {
  postImageToCloudinary,
  getImageFromCloudinary,
};
