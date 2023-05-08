import { Request, Response } from "express";

const CLIENT_ID = "Iv1.0f2124a7d7aa9dee";
const CLIENT_SECRET = "5b0d1b133e3c7208dfef8ea200e5458218a2c25a";

const getAccessToken = async (req: Request, res: Response) => {
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
      console.log(data);
      res.json(data);
    });
};

const getUserData = async function (req: Request, res: Response) {
  req.get("Authorization");
  // const _res =
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
    },
  })
    // const response = await _res.json();
    // return response;
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.json(data);
    });
};

module.exports = { getAccessToken, getUserData };
