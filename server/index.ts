import express, { Express } from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mainRouter from "./router/index";
import { populateDatabase } from "./controllersMain/populateController";

const app: Express = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());
app.use(mainRouter);

(async () => {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
      //     populateDatabase()
      // .then((message) => {
      //   console.log(message);
      // })
      // .catch((error) => {
      //   console.error("Failed to populate the database:", error);
      // });
    });
  } catch (error) {
    console.log("Error in connecting to database :", error);
  }
})();

//RUN WITH npm run dev
