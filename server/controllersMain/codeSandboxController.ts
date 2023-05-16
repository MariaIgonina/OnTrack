import { Request, Response } from "express";
import axios from 'axios'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function sendCompile(req: Request, res: Response) {
  const { language_id, source_code, customInput } = req.body;
  console.log('req.body BE => ', req.body)

  const formData = {
    language_id: language_id,
    // encode source code in base64
    source_code: btoa(source_code),
    // stdin: btoa(customInput),
  };
console.log('lang -> ', formData.language_id, typeof formData.language_id)
  const options = {
    method: "POST",
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Host": 'judge0-ce.p.rapidapi.com',
      "X-RapidAPI-Key": '13eb829a35msh2a8e334168fe3eep133bf3jsnbff9be0470a9',
    },
    data: formData,
  };

  axios
    .request(options)
    .then(function (response) {
      console.log("res.data", response.data);
      const token = response.data.token;
      res.status(201).json(token)
    })
    .catch((err) => {
      let error = err.response ? err.response.data : err;
      console.log('error from BE axios ->', error);
    });
}

const createSandox = async (req:Request, res:Response)=>{
  // try {

  //   const codebox = await prisma.codeSandbox.create({

  //   })
    
  // } catch (error) {
    
  // }
}

export const codeSandbox = {
  sendCompile,

}