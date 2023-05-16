import { useStepContext } from "@mui/material";
import Landing from "../codeSandbox/Landing";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
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
  const [check, setCheck] = useState(false);

  const info = 'Mark this step as checked';
  const infoNotChecked = 'This event has place in the future'

  const handleCheck = () => {
    if (checkIsAble && !check) {
      console.log('checking!')
      setCheck(true)
      // dispatch(setStepById(stepId, step: {checked: true}))
    } else if (checkIsAble && check) {
      setCheck(false)
      // dispatch(setStepById(stepId, step: {checked: false}))
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
          className={`${check ? 'text-green-700' : 'text-gray-200 hover:text-green-500'}  hover:cursor-pointer relative
          ${check && "hover:text-rose-500"} ${!checkIsAble && "hover:text-rose-300"}
          `}
        >{!check && <CheckCircleIcon />}
        {check && !showInfo && <CheckCircleIcon/>}
        {check && showInfo && <HighlightOffIcon/>}
          {showInfo && !check && (
            <div className={
              `${checkIsAble && !check && "text-emerald-700"} 
               opacity-50 py-2 px-4 w-max min-w-[200px] rounded-lg absolute left-9 -bottom-1 z-10 font-bold
              `}>
              {checkIsAble && info}
              {!checkIsAble && infoNotChecked}
            </div>
          )}
        </button>
        < div id='step-container'
          className={`h-fit w-fit ${check ? "bg-emerald-100 border border-emerald-800 opacity-40" : "bg-green-100"} rounded-lg text-xl p-3 text-center shadow shadow-md
      flex flex-col justify-center align-center shadow-xl mb-5`}>

          <h4 className={`${check ? "text-emerald-800" :"text-gray-100"}`}>{title}</h4>
          <p>{content}</p>
        </div >
      </>
    }
  </>
  );
}

export default StepTemplate;

