import { Request, Response } from "express";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const rapidApiHost = process.env.RAPIDAPI_HOST;
const rapidApiKey = process.env.RAPIDAPI_KEY;

async function sendCompile(req: Request, res: Response) {
  const { language_id, source_code, customInput } = req.body;
  console.log("req.body BE => ", req.body);

  const formData = {
    language_id: language_id,
    // encode source code in base64
    source_code: btoa(source_code),
    // stdin: btoa(customInput),
  };
  console.log("lang -> ", formData.language_id, typeof formData.language_id);
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Host": rapidApiHost,
      "X-RapidAPI-Key": rapidApiKey,
    },
    data: formData,
  };

  axios
    .request(options)
    .then(function (response) {
      console.log("res.data", response.data);
      const token = response.data.token;
      res.status(201).json(token);
    })
    .catch((err) => {
      let error = err.response ? err.response.data : err;
      console.log("error from BE axios ->", error);
    });
}

function test(req: Request, res: Response) {
  try {
    res.status(200).send("Correct route for sandbox");
  } catch (error) {
    console.log("test error sandbox", error);
    res.send(error);
  }
}

const createSandox = async (req: Request, res: Response) => {
  try {
    const { title, code, order, trackId, hidden, date } = req.body;
    console.log(title, code, order);
    const codebox = await prisma.codeSandbox.create({
      data: {
        Track: { connect: { id: trackId } },
        title,
        code,
        order,
        hidden,
        date,
      },
    });
    res.status(201).json(codebox);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error);
  }
};

const getSandBoxByTrackId = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const codebox = await prisma.codeSandbox.findMany({
      where: {
        trackId: parseInt(id),
      },
    });

    if (!codebox) throw new Error("Codebox not found!");

    res.status(201).json(codebox);
  } catch (error: any) {
    console.log("Error in CodeBox", error);
    res.status(400).json(error.message);
  }
};

const deleteCodeBox = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const codeBox = await prisma.codeSandbox.delete({ where: { id } })
    res.status(200).json(codeBox)
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error.message)
  }
}

const updateCodeBox = async (req: Request, res: Response) => {
  console.log('updating check!')
  const { id } = req.params;
  const { date, hidden, title, code, checked, order } = req.body;
  try {
    const codeBox = await prisma.codeSandbox.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...(date !== undefined && { date }),
        ...(hidden !== undefined && { hidden }),
        ...(title !== undefined && { title }),
        ...(code !== undefined && { code }),
        ...(checked !== undefined && { checked }),
        ...(order !== undefined && { order }),
      },
    });
    res.json(codeBox).status(200);
  } catch (error: any) {
    console.log('error in codeBoxController', error);
    if (error.meta.cause === "CodeBox to update does not exist")
      res.status(404).json(error.meta.cause);
    else res.status(409).json(error.meta.cause);
  }
}

export const codeSandbox = {
  sendCompile,
  test,
  createSandox,
  getSandBoxByTrackId,
  deleteCodeBox,
  updateCodeBox
};
