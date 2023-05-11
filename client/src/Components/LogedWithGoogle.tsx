import { useEffect, useState } from "react";

type InfoRequestData = {
  token: string
  applicant: boolean
}

const loggedWithGoogle = () => {
  const [userName, setUserName] = useState('')
  const [userImg, setUserImg] = useState<any>('')
  
  let params: any = {};

  let regex = /([^&=]+)=([^&]*)/g, m;
  while (m = regex.exec(location.href)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
  }

  if (Object.keys(params).length > 0) {
    localStorage.setItem('authInfo', JSON.stringify(params))
  }

  // hide the access token
  window.history.pushState({}, document.title, "/" + "logedWithGoogle")

  let info = JSON.parse(localStorage.getItem('authInfo')!)
  let token: string = info['access_token']

  const userInfoRequest = async (data: InfoRequestData) => {
    try {
      const response = await fetch("http://localhost:3000/getGoogleUserInfo", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const result = await response.json();
      setUserName(result.name);
      setUserImg(result.picture);
      console.log('response in FE for userInfoRequest: ', result)
      return result;
    } catch (error) {
      console.log(error)
    }
  }
  userInfoRequest({ token, applicant: true });

  //redirect somewhere here

  return (
    <div>
      <h1> You've been loged with google, ain't it fun?!</h1>
      <h2>Your full name: {userName}</h2>
      <img id="profilePicture" src={userImg} />
      <button>Logout</button>
    </div>);
}

export default loggedWithGoogle;