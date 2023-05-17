import React from "react";

interface QuestionaryFormProps {
  step: any;
  answers: string[];
  setAnswers: React.Dispatch<React.SetStateAction<string[]>>;
  handleChange: (index: number, value: string) => void;
  submitQuestionnary: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function OpenedAccordionApplicant({
  step,
  answers,
  setAnswers,
  handleChange,
  submitQuestionnary,
}: QuestionaryFormProps) {
  return (
    <>
      <div id="accordionExample">
        <div className="rounded-t-lg border border-neutral-200 bg-stone-100">
          <h2 className="mb-0" id="headingOne">
            <button
              className="group relative flex w-full items-center rounded-t-[15px] 
          border-0 bg-[#68C3D4] px-5 py-4 text-left text-base text-black transition 
          [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:text-black 
          [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary 
          [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] 
          dark:[&:not([data-te-collapse-collapsed])]:bg-[#68C3D4] dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 
          dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
              type="button"
              data-te-collapse-init
              data-te-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <div className="text-2xl">Questionary</div>
              <span
                className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform 
          duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] 
          motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white"
              >
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
            id="collapseOne"
            className="!visible"
            data-te-collapse-item
            data-te-collapse-show
            aria-labelledby="headingOne"
            data-te-parent="#accordionExample"
          >
            <div className="grid grid-cols-1 mx-7 mb-5">
              {step &&
                step.questions!.map((question: string, index: number) => (
                  <div key={index} className="mt-3">
                    <div className="text-darktext-black font-mono tracking-tight text-lg">
                      {index +1}
                      {") "}
                      {question}
                    </div>
                    <textarea
                      placeholder="Your answer here..."
                      className="w-full py-2 px-3 rounded-lg bg-stone-100 mt-1 font-mono tracking-tight
                    focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                      style={{
                        color: "#568EA3",
                      }}
                      id="about"
                      name="about"
                      defaultValue={answers[index] || ""}
                      onChange={(event) =>
                        handleChange(index, event.target.value)
                      }
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={(e) => submitQuestionnary(e)}
          className="mt-4 ml-4 mb-6 w-44 bg-orange-100 rounded-lg shadow-xl font-medium text-white px-4 py-2
              hover:-translate-y-1 hover:bg-emerald-800
              "
          type="submit"
        >
          Send answer
        </button>
      </div>
    </>
  );
}
