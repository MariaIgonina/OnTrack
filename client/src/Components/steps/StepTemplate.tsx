import { useStepContext } from "@mui/material";
import Landing from "../codeSandbox/Landing";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from "react";

type StepProps = {
  title?: string,
  link?: string,
  content?: any,
  type: string,
  checkIsAble: boolean
}
const StepTemplate = ({ title, link, content, type, checkIsAble }: StepProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const [check, setCheck] = useState(false)

  const info = 'Mark this step as checked';
  const infoNotChecked = 'This event has not happend yet'

  const handleCheck = () => {
    if (checkIsAble) {
      setCheck(true)
    } 
  }

  return (<>
    {type === 'sandbox'
      ? <>
        <h4 className="text-xl text-gray-100 rounded bg-green-100 p-2 z-40 -mb-4 shadow shadow-md">{title || 'Next step: Code'}</h4>
        <Landing />
      </>
      :
      <>
        <button
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
          onClick={handleCheck}
          className={`${check ? 'text-green-800' : 'text-gray-200'} hover:text-green-500 hover:cursor-pointer relative`}
        ><CheckCircleIcon />
          {showInfo && (
            <div className="bg-emerald-100 text-emerald-900 border border-emerald-900 py-2 px-4 w-60 rounded-lg absolute left-9 -bottom-1 z-10">
              {check ? info : infoNotChecked}
            </div>
          )}
        </button>
        <h1></h1>
        < div id='step-container'
          className="h-fit w-fit bg-green-100 rounded-lg text-xl p-3 text-center shadow shadow-md
      flex flex-col justify-center align-center shadow-xl mb-5  ">

          <h4 className="text-gray-100">{title}</h4>

          {link &&
            <div className={`h-16 z-10 fixed top-0 left-0 w-screen transition-all duration-200
         "bg-white" : "bg-transparent"`} >
              <a href={link}>Link</a>
            </div>
          }
          {content}
        </div >
      </>
    }
  </>
  );
}

export default StepTemplate;

