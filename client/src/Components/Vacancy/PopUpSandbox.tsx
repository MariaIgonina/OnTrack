import React, { useState } from "react";
import Landing from "../codeSandbox/Landing";
import CodeEditorWindow from "../codeSandbox/Editor";

const javascriptDefault = `// some comment`;

export default function PopUpSandbox() {
  const [code, setCode] = useState(javascriptDefault);

  const onChange = (action: string, data: any) => {
    switch (action) {
      case "code": {
        setCode(data);
        console.log(typeof code)
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const submitSandBox = () => {
    try {
      
    } catch (error) {
      
    }
  };

  return (
    // <div className="bg-stone-100 rounded-lg w-full m-5 m-8 p-4 pr-8 pl-8 shadow-md">
        <div>
      <div className="flex flex-col w-full h-full justify-start items-end">
        <CodeEditorWindow code={code} onChange={onChange} />
        <div className="flex items-center justify-center h-full">

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
