import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import "./Login.css";

const CLIENT_ID = "Iv1.0f2124a7d7aa9dee";

const LoginPage = () => {
  const [render, setReRender] = useState(false);

  function loginWithGitHub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
  }

  function logoutFromGithub() {
    localStorage.removeItem("accessToken");
    setReRender(!render);
  }

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);

    if (codeParam && localStorage.getItem("accessToken") === null) {
      //this should got in API service file
      async function getAccessToken() {
        try {
          await fetch(
            "http://localhost:3000/getAccessToken?code=" + codeParam,
            {
              method: "GET",
            }
          )
            .then((data) => {
              console.log("hello");
              console.log(typeof data);
              console.log("DATATATAT", data);
              return data.json();
            })
            .then((data) => {
              console.log("data", data);
              if (data.access_token) {
                console.log("data.access_token =", data.access_token);
                localStorage.setItem("accessToken", data.access_token);
                setReRender(!render);
              }
            });
        } catch (e) {
          console.log("EEEEError", e);
        }
      }
      getAccessToken();
    }
  }, []);

  async function getUserData() {
    await fetch("http://localhost:3000/getUserData", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        console.log("hello");
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <>
    <div className="container">
      {localStorage.getItem("accessToken") ? (
        <>
          <h3>You are logged in</h3>
          <button onClick={getUserData}>Get Data from GitHub API</button>
          <button className="btn" type="submit" onClick={logoutFromGithub}>
            LogOut
          </button>
        </>
      ) : (
        <>
          <label className="label">Email</label>
          <input name="email" type="text"></input>

          <label className="label">Password</label>
          <input name="Password" type="text"></input>
          <button className="githubbtn" onClick={loginWithGitHub}>
            Login With GitHub
          </button>
          <Button variant="contained" className="btn" type="submit">
            LOG IN
          </Button>
        </>
      )}
    </div>
    /*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/


    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
    </>
  )
}
export default LoginPage;
