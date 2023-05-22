import { Request, Response } from "express";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export const getAccessToken = async (req: Request, res: Response) => {
  console.log(req.query.code);

  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;
  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.json(data);
    });
};

export const getUserData = async function (req: Request, res: Response) {
  const access_token = req.get("Authorization");
  const _res = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: access_token!,
    },
  });
  const response = await _res.json();

  res.status(200);
  res.json(response);
  return;
};
