import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./router";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { populateDatabase } from "./controllersMain/populateController";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());
app.use(router);

(async () => {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
      // populateDatabase();
    });
  } catch (error) {
    console.log("Error in connecting to database :", error);
  }
})();

//RUN WITH npm run dev
