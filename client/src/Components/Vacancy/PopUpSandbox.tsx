import React, { useState } from "react";
import Landing from "../codeSandbox/Landing";
import CodeEditorWindow from "../codeSandbox/Editor";

const javascriptDefault = `// some comment`;

interface Props {
  code: string
  setCode: (code:string) => void
  setIsPopupSandbox: (isPopupSandbox:boolean) => void

}

export default function PopUpSandbox({code, setCode, setIsPopupSandbox}:Props) {

  const onChange = (action: string, data: any) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const submitSandBox = () => {
    setIsPopupSandbox(false)
  };

  return (
    <div>
      <div className="flex flex-col w-full h-full justify-start items-end">
        <CodeEditorWindow code={code} onChange={onChange} />
        <div className="flex items-center justify-center h-full">
        <h2 className="text-2xl font-bold tracking-tight text-[#026767] mb-2">
          Type here the task
        </h2>
        <button
          onClick={submitSandBox}
          className="mt-4 ml-4 mb-6 w-44 bg-orange-100 hover:bg-orange-dark rounded-lg shadow-xl font-medium text-white px-4 py-2"
          type="submit"
        >
          Submit SandBox
        </button>
      </div>
      </div>
    </div>
  );
}
