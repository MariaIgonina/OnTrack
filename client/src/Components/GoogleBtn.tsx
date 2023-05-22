import React, { useEffect, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";

// Reminder: store this in an .env file also in the client later
const googleCliendId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const redirectUri = import.meta.env.VITE_REDIRECT_URI;

export default function LoginGoogle() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkSignedIn = () => {
      const searchParams = new URLSearchParams(window.location.hash.slice(1));
      const accessToken = searchParams.get('access_token');
      const expiresIn = searchParams.get('expires_in');
      const tokenType = searchParams.get('token_type');

      if (accessToken) {
        setIsSignedIn(true);
      }
    };
    checkSignedIn()
  }, [])

  const handleSignIn = () => {
    const baseURL = 'https://accounts.google.com/o/oauth2/v2/auth';
    const form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', baseURL);

    const params: any = {
      "client_id": googleCliendId,
      "redirect_uri": redirectUri,
      "response_type": "token",
      "scope": "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
      "include_granted_scopes": 'true',
      "state": 'pass-through-value'
    };

    for (const param in params) {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', param);
      input.setAttribute('value', params[param]);
      form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
  }


  return (
    <div id="googleLoginButton">
      {
        isSignedIn
          ? <div>User is signed in, remove this later</div>
          : <Button
            onClick={handleSignIn}
            sx={{ backgroundColor: "#568EA3", margin: "5px" }}
            variant="contained"
            className="btn"
            type="submit"
          >
            <GoogleIcon sx={{ marginRight: "15px" }}/>
            Sign-up with Google
          </Button>
      }
    </div>
  );
}
