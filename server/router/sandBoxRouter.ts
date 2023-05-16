import { Router } from "express";
import { codeSandbox } from "../controllersMain/codeSandboxController";

const codeSandboxRouter = Router()

// Send the code to compile it and receive it
codeSandboxRouter.post('/compile', codeSandbox.sendCompile);
codeSandboxRouter.get('/compile', codeSandbox.test);

// Create, delete, update and get a codebox
codeSandboxRouter.post("/createcode", codeSandbox.createSandox)
codeSandboxRouter.get("/getcode/:id", codeSandbox.getSandBoxByTrackId)
codeSandboxRouter.put("/updatecode/:id", codeSandbox.updateCodeBox)
codeSandboxRouter.delete("/deletecode/:id", codeSandbox.deleteCodeBox)


export default codeSandboxRouter