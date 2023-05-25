import React from "react";

interface QuestionaryFormProps {
  step: any;
  answers: string[];
}

export default function ClosedAccordion({
  step,
  answers,
}: QuestionaryFormProps) {
  return (
    <div id="accordionExample">
      <div
        className="rounded-t-lg border border-neutral-200 bg-stone-100"
        style={{ background: "FFFDED" }}
      >
        <h2 className="mb-0" id="headingTwo">
          <button
            className="group relative flex w-full items-center rounded-t-[15px] border-0 bg-[#68C3D4] px-5 py-4 
          text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] 
          focus:outline-none dark:text-black [&:not([data-te-collapse-collapsed])]:bg-[#68C3D4] 
          [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] 
          dark:[&:not([data-te-collapse-collapsed])]:bg-[#68C3D4] dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 
          dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
            type="button"
            data-te-collapse-init
            data-te-collapse-collapsed
            data-te-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            <div className="text-2xl">Questionary</div>
            <span className="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
        </h2>
        <div
          id="collapseTwo"
          className="!visible hidden"
          data-te-collapse-item
          aria-labelledby="headingTwo"
          data-te-parent="#accordionExample"
        >
          <div className="grid grid-cols-1 mx-7 mb-5">
            {step &&
              step.questions!.map((question: string, index: number) => (
                <div key={index} className="mt-3">
                  <div className="text-black font-mono tracking-tight text-lg">
                    {index + 1}
                    {") "}
                    {question}
                  </div>
                  <div
                    className="w-full py-2 px-3 rounded-lg  mt-1
                    font-mono tracking-tight"
                    style={{
                      background: "FFFDED",
                      color: "#568EA3",
                    }}
                  >
                    {answers[index] || ""}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div
          style={{ width: "176px", height: "48px" }}
          className="mt-4 ml-4 mb-6 bg-emerald-100 rounded-lg shadow-xl flex items-center justify-center text-neutral-700 font-medium opacity-50 border border-emerald-800"
        >
          Form Submitted
        </div>
      </div>
    </div>
  );
}
