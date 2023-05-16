import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./Editor";
import axios from "axios";
import classnames from "./utils/general";
import { languageOptions } from "./lib/languageOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useKeyPress from "../../../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
// import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetail";
import LanguagesDropdown from "./LanguagesDropdown";

type Token = {
  token: string
}

type LandingProps = {
  savedCode: string
}

const Landing = ({savedCode}: LandingProps) => {
  const [code, setCode] = useState(savedCode);
  const [outputDetails, setOutputDetails] = useState<string>('');
  const [processing, setProcessing] = useState<boolean | null>(null);
  const [language, setLanguage] = useState(languageOptions[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl: any) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
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

  const handleCompile = async () => {

    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: code
      // stdin: btoa(customInput),
    };
    console.log(formData)

    const token = await axios.post('http://localhost:3000/compile', formData)
    console.log('token from FE', token)
    checkStatus(token.data)
  };



  const checkStatus = async (token: any) => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions" + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": 'judge0-ce.p.rapidapi.com',
        "X-RapidAPI-Key": '13eb829a35msh2a8e334168fe3eep133bf3jsnbff9be0470a9',
      },
    };

    try {
      let response = await axios.request(options);

      console.log('FE', response.data);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return
      } else {
        setProcessing(false)
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`)
        console.log('response.data from', window.atob(response.data))
        return
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      // showErrorToast('');
    }
  };

  const showSuccessToast = (msg: string) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  // const showErrorToast = (msg: string) => {
  //   toast.error(msg || `Something went wrong! Please try again.`, {
  //     position: "top-right",
  //     autoClose: 1000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };

  return (
    <>
      <div className="w-[80%] h-[500px]">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="border border-black rounded-lg bg-stone-100 flex flex-col max-w-905 min-w-731 shadow shadow-lg">
          <div className="flex flex-row">
            <div className="px-4 py-2">
              <LanguagesDropdown onSelectChange={onSelectChange} />
            </div>
          </div>
          <div className="flex flex-row space-x-4 items-start px-4 py-4 ">
            <div className="flex flex-col w-full h-full justify-start items-end">
              <CodeEditorWindow
                code={code}
                onChange={onChange}
                language={language?.value}
              />
            </div>

            <div id='outputs-panel' className="right-container flex flex-shrink-0 w-[30%] flex-col">
              <OutputWindow outputDetails={outputDetails} />
              <div className="flex flex-col items-end">
                <button
                  onClick={handleCompile}
                  disabled={!code}
                  className={classnames(
                    "mt-4 border-2 border-black rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                    !code ? "opacity-50" : ""
                  )}
                >
                  {processing ? "Processing..." : "Compile and Execute"}
                </button>
              </div>
              {outputDetails && <OutputDetails outputDetails={outputDetails} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;