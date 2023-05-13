import { Router } from "express";
import { codeSandbox } from "../controllersMain/codeSandboxController";

const codeSandboxRouter = Router()

codeSandboxRouter.post('/compile', codeSandbox.sendCompile);

export default codeSandboxRouter