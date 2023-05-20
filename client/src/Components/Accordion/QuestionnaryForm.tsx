import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Questionary } from "../../Interfaces";
import { updateQuestionary } from "../../store/QuestionarySlice";
import { Collapse, initTE } from "tw-elements";
type QuestionaryFormProps = {
  step: any;
};
import OpenedAccordionApplicant from "./OpenedAccordionApplicant";
import ClosedAccordion from "./ClosedAccordion";
import OpenedAccordionRecruiter from "./OpenedAccordionRecruiter";

export default function QuestionnaryForm({ step }: QuestionaryFormProps) {
  const questionary = useSelector((state: RootState) => state.questionary);
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const dispatch = useDispatch<AppDispatch>();

  const [answers, setAnswers] = useState<string[]>([...step.answer]);

  useEffect(() => {
    initTE({ Collapse });
  }, []);

  const handleChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  // await async ?
  const submitQuestionnary = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const updatedQuestionnary = {
      questionaryId: step.id,
      questionary: {
        answers: answers,
      },
    };
    dispatch(updateQuestionary(updatedQuestionnary));
    window.location.reload();
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
              {currentUser.role === "recruiter" && (
                <>
                  {step.answer.length === 0 && (
                    <>
                      <OpenedAccordionRecruiter
                        step={step}
                      />
                    </>
                  )}

                  {step.answer.length !== 0 && (
                    <>
                      <ClosedAccordion step={step} answers={answers} />
                    </>
                  )}
                </>
              )}
              {currentUser.role !== "recruiter" && (
                <>
                  {step.answer.length === 0 && (
                    <>
                      <OpenedAccordionApplicant
                        step={step}
                        answers={answers}
                        setAnswers={setAnswers}
                        handleChange={handleChange}
                        submitQuestionnary={submitQuestionnary}
                      />
                    </>
                  )}

                  {step.answer.length !== 0 && (
                    <>
                      <ClosedAccordion step={step} answers={answers} />
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
