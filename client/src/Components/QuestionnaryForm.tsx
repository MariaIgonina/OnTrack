import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Questionary } from "../Interfaces";
import {
  fetchQuestionaryTrack,
  updateQuestionary,
} from "../store/QuestionarySlice";
import { Collapse, initTE } from "tw-elements";
type QuestionaryFormProps = {
  step: any;
};

export default function QuestionnaryForm({ step }: QuestionaryFormProps) {
  const questionary = useSelector((state: RootState) => state.questionary);

  const dispatch = useDispatch<AppDispatch>();

  const [answers, setAnswers] = useState<string[]>([...step.answer]);
  const [display, setDisplay] = useState<boolean>(true);

  useEffect(() => {
    initTE({ Collapse });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log("STEP FROM QUESTIONARY", step.answer.length);
      try {
        await dispatch(fetchQuestionaryTrack(step.trackId));
      } catch (error) {
        console.error("An error happened while fetching infos :", error);
      }
    };
    fetchData();
  }, [step]);

  const handleChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
    console.log(answers);
  };

  // await async ?
  const submitQuestionnary = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const updatedQuestionnary = {
      questionaryId: questionary.questionary.id,
      questionary: {
        answers: answers,
      },
    };
    dispatch(updateQuestionary(updatedQuestionnary));
    // console.log(questionary);
    setDisplay(false);
    window.location.reload()
  };

  return (
    <>
      <div className="p-2 flex items-center justify-center mb-8">
        <form>
          <div className="flex justify-center">
            <div
              className="grid grid-cols-1 mt-5 mx-7 "
              style={{ width: "600px" }}
            >
              {step.answer.length === 0 && (
                <>
                  <div id="accordionExample">
                    <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                      <h2 className="mb-0" id="headingOne">
                        <button
                          className="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                          type="button"
                          data-te-collapse-init
                          data-te-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          <div className="text-2xl">Questionary</div>
                          <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
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
                          {questionary &&
                            questionary.questionary.questions!.map(
                              (question, index) => (
                                <div key={index} className="mt-3">
                                  <div className="text-white">{question}</div>
                                  <textarea
                                    placeholder="Your answer here..."
                                    className="w-full py-2 px-3 rounded-lg border border-color-#F1F0EA mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                                    id="about"
                                    name="about"
                                    defaultValue={answers[index] || ""}
                                  />
                                </div>
                              )
                            )}
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
              )}

              {step.answer.length !== 0 && (
                <div id="accordionExample">
                  <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="mb-0" id="headingTwo">
                      <button
                        className="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                        type="button"
                        data-te-collapse-init
                        data-te-collapse-collapsed
                        data-te-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Accordion Item #2
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
                        {questionary &&
                          questionary.questionary.questions!.map(
                            (question, index) => (
                              <div key={index} className="mt-3">
                                <div className="text-white">{question}</div>
                                <textarea
                                  placeholder="Your answer here..."
                                  className="w-full py-2 px-3 rounded-lg border border-color-#F1F0EA mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                                  // type="text"
                                  id="about"
                                  name="about"
                                  value={answers[index] || ""}
                                  onChange={(event) =>
                                    handleChange(index, event.target.value)
                                  }
                                />
                              </div>
                            )
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div
                      style={{width: "176px", height: "48px"}}
                      className="mt-4 ml-4 mb-6 bg-green-700 rounded-lg shadow-xl flex items-center justify-center text-white font-medium"
                    >
                      Form Submitted
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
