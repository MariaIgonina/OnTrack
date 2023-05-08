import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import dotenv from 'dotenv';
dotenv.config()

const prisma = new PrismaClient();

