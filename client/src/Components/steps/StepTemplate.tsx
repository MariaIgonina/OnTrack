import { useEffect } from "react";
import Landing from "../codeSandbox/Landing";

type StepProps = {
  title?: string,
  link?: string,
  content?: any,
  type: string
}
const StepTemplate = ({ title, link, content, type }: StepProps) => {
  // useEffect(() => {
  //   console.warn('step template => ', title, type)
  // }, [])
  return (<>
    {type === 'sandbox'
      ? <>
        <h4 className="text-xl rounded bg-green-100 p-2 z-40 -mb-4 shadow shadow-md">{title || 'Next step: Code'}</h4>
          <Landing />
      </>
      :
      < div id='step-container'
        className="h-fit w-fit bg-green-100 rounded-lg text-xl p-3 text-center shadow shadow-md
      flex flex-col justify-center align-center shadow-xl mb-5 ">

        <h4>{title}</h4>

        {link &&
          <div className={`h-16 z-10 fixed top-0 left-0 w-screen transition-all duration-200
         "bg-white" : "bg-transparent"`} >
            <a href={link}>Link</a>
          </div>
        }
        {content}
      </div >
    }
  </>
  );
}

export default StepTemplate;

