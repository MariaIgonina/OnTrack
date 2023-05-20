import express, { Express } from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
import mainRouter from "./router/index";
import { populateDatabase } from "./controllersMain/populateController";
import { messageController } from "./controllersMain/messageController";

const app: Express = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());
app.use(mainRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("joinRoom", (trackId) => {
    socket.join(trackId);
    console.log(`User with ID: ${socket.id} joined room: ${trackId}`);
  });
  socket.on("sendMessage", async (message) => {
    try {

      socket.to(message.trackId).emit("receive_message", message);
    } catch (error) {
      console.error("Error while saving the message:", error);
    }
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

(async () => {
  try {
    await prisma.$connect();
    server.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);

    });
  } catch (error) {
    console.log("Error in connecting to database :", error);
  }
})();

