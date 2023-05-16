import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateVideocall } from "../../store/VideoCallSlice";
import { AppDispatch } from "../../store/store";
import { updateSandbox } from "../../store/SandboxSlice";
import { updateQuestionary } from "../../store/QuestionarySlice";

type StepProps = {
  title?: string,
  link?: string,
  content?: any,
  type: string,
  checkIsAble: boolean,
  step?: any,
  setReloadAlert: Function
}
const StepTemplate = ({ title, content, type, checkIsAble, step, setReloadAlert }: StepProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const [check, setCheck] = useState(step.checked || false);
  const [showDoneCode, setShowDoneCode] = useState(false)

  const dispatch = useDispatch<AppDispatch>();
  const info = 'Check this step';
  const infoNotChecked = 'This event has place in the future'


  const handleCheck = () => {
    if (checkIsAble && !check) {
      setCheck(true)

      switch (type.toLowerCase()) {
        case 'videocall':
          console.log('videocall', step.id)
          dispatch(updateVideocall({ videocallId: step.id, videocall: { checked: true } }));
          break;
        case 'sandbox':
          console.log('sandbox', step.id)
          dispatch(updateSandbox({ sandboxId: step.id, sandbox: { checked: true } }));
          break;
        case 'questionary':
          console.log('questionary', step.id)
          dispatch(updateQuestionary({ questionaryId: step.id, questionary: { checked: true } }));
          break;
        default:
          break;
      }

    } else if (checkIsAble && check) {
      setCheck(false)

      switch (type.toLowerCase()) {
        case 'videocall':
          dispatch(updateVideocall({ videocallId: step.id, videocall: { checked: false } }));
          break;
        case 'sandbox':
          dispatch(updateSandbox({ sandboxId: step.id, sandbox: { checked: false } }));
          setReloadAlert(true)
          break;
        case 'questionary':
          dispatch(updateQuestionary({ questionaryId: step.id, questionary: { checked: false } }));
          break;
        default:
          break;
      }
    }
  }

  const handleShowDoneCode = () => {
    setShowDoneCode(!showDoneCode)
  }

  return (<>
    {type === 'sandbox'
      ? <>
        <button
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
          onClick={handleCheck}
          className={`${check ? 'text-green-700' : 'text-gray-200 hover:text-green-500'}  hover:cursor-pointer relative
          ${check && "hover:text-rose-500"} ${!checkIsAble && "hover:text-rose-300"}
          `}
        >{!check && <CheckCircleIcon />}
          {check && !showInfo && <CheckCircleIcon />}
          {check && showInfo && <HighlightOffIcon />}
          {showInfo && !check && (
            <div className={
              `${checkIsAble && !check && "text-emerald-700"} 
               opacity-50 py-2 px-4 w-max min-w-[200px] rounded-lg absolute left-5 -bottom-1 z-40 font-bold text-left
              `}>
              {checkIsAble && info}
              {!checkIsAble && infoNotChecked}
            </div>
          )}
        </button>
        <h4 className={`${check ? "text-emerald-800" : "text-gray-100"} z-50 h-fit w-fit ${check ? "bg-emerald-100 border border-emerald-800 opacity-30" : "bg-green-100"} 
        font-bold tracking-widest text-xl rounded p-2 -mb-4 shadow shadow-md`}>
          {title || 'Next step: Code'}
        </h4>
        {/* {check && <div id='checked-screen' className="relative flex justify-start z-10 w-[1000px]"><div className="bg-neutral-100 opacity-80 z-10 absolute w-[100%] h-[407px]" style={{ left: "0%" }}></div></div>} */}
        {!check ? content : <><div className="h-[100px]">
          <button onClick={handleShowDoneCode}
            className='bg-emerald-100 opacity-80 p-1 rounded-xl text-emerald-800 relative top-5'>Watch resume<KeyboardArrowDownIcon /> </button>
        </div>
          {showDoneCode && content}
        </>}
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
          {check && !showInfo && <CheckCircleIcon />}
          {check && showInfo && <HighlightOffIcon />}
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
          <h4 className={`${check ? "text-emerald-800" : "text-gray-100"} font-bold tracking-widest text-xl`}>
            {title}
          </h4>
          {content}
        </div >
      </>
    }
  </>
  );
}

export default StepTemplate;

