import { Router, Request, Response } from "express";
const router = Router();
const authController = require("./Controllers/authController");

router.get("/", (req: Request, res: Response) => {
  res.send("Hello, World! This is the main route");
});

router.get("/getAccessToken", authController.getAccessToken);
router.get("/getUserData", authController.getUserData);

export default router;
