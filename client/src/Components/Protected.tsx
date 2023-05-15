import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Navigate, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

interface ProtectedProps {
  isLoggedIn: boolean,
  children: JSX.Element
}

const Protected = ({ isLoggedIn, children }: ProtectedProps) => {
  const navigate = useNavigate()
  if (!isLoggedIn) {
    setTimeout(() => {
      navigate('/')
    }, 3000)
    return (
      <div>
        <div className="w-screen h-screen text-center
        flex flex-col justify-center items-center text-lg text-green-800 bg-stone-100">
          To access to this content you need to be logged-in. 
          <br></br>
          We're redirecting you.
          <Spinner/>
        </div>
      </div>
    );
  }
  return children;
};
export default Protected;