"use client";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/joy/Button";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const submittedAnswers: TSubmittedAnswer[] = [];
const questionTimer = 40;
let intervalId: NodeJS.Timer | undefined;

function LevelTest({ levelTest }: TLevelTest) {
  console.log(submittedAnswers, "answers");
  const [value, setValue] = useState("");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [remainingTime, setRemainingTime] = useState(questionTimer);
  const isTestFinished = questionNumber === levelTest.length;

  const handleNextQuestion = useCallback(
    (answer: string) => {
      if (answer) {
        const submittedAnswer: TSubmittedAnswer = {
          answer,
          level: levelTest.find(
            (question) => question.id === questionNumber + 1
          )?.level as TLevel,
        };
        submittedAnswers.push(submittedAnswer);
      } else {
        submittedAnswers.push({ answer: null, level: null });
      }

      setValue("");
      setQuestionNumber((prev) => prev + 1);
      setRemainingTime(questionTimer);
    },
    [levelTest, questionNumber]
  );

  useEffect(() => {
    intervalId = !isTestFinished
      ? setInterval(() => {
          setRemainingTime((time) => time - 1);
        }, 1000)
      : undefined;

    return () => clearInterval(intervalId);
  }, [handleNextQuestion, isTestFinished]);

  useEffect(() => {
    if (!remainingTime) {
      handleNextQuestion(value);
    }
  }, [remainingTime, handleNextQuestion, value]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleNextQuestion(value);
  };

  console.log(value, "radioValue");

  return (
    <div>
      {isTestFinished ? (
        <div className="text-2xl text-lingo-green text-center font-bold">
          Test Finished
        </div>
      ) : (
        <>
          <div className="text-2xl text-lingo-green text-center font-bold mb-16 w-[100px] mx-auto">
            00 : {remainingTime < 10 ? `0${remainingTime}` : remainingTime}
          </div>
          <div className="flex flex-col justify-center items-center gap-20 h-full">
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                <FormControl
                  sx={{ gap: 3, width: "100%", minHeight: "500px" }}
                  variant="standard"
                  component={motion.div}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  key={questionNumber}
                >
                  <FormLabel sx={{ fontSize: "20px", color: "#000" }}>
                    {levelTest[questionNumber].question}
                  </FormLabel>
                  <RadioGroup
                    name="levelTest"
                    value={value}
                    onChange={handleRadioChange}
                  >
                    <List
                      sx={{
                        minWidth: 240,
                        "--List-gap": "0.5rem",
                        "--ListItem-paddingY": "1rem",
                        "--ListItem-radius": "8px",
                        "--ListItemDecorator-size": "32px",
                      }}
                    >
                      {levelTest[questionNumber].choices.map((item, index) => (
                        <ListItem
                          variant="outlined"
                          key={item}
                          sx={{ boxShadow: "sm" }}
                        >
                          <Radio
                            overlay
                            value={item}
                            label={item}
                            sx={{
                              flexGrow: 1,
                              color: "#2f9e4d",
                              "& .MuiRadio-radio": {
                                color: "#2f9e4d",
                              },
                              "& .MuiRadio-label": {
                                color: "#293142",
                              },
                            }}
                            color="success"
                            slotProps={{
                              action: ({ checked }) => ({
                                sx: () => ({
                                  ...(checked && {
                                    inset: -1,
                                    border: "1px solid #2f9e4d",
                                  }),
                                }),
                              }),
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </RadioGroup>
                  <Button
                    disabled={!value}
                    type="submit"
                    variant="soft"
                    className="bg-lingo-green hover:bg-[#2f904d]"
                    color="success"
                    sx={{
                      color: "#FFF",
                    }}
                  >
                    {questionNumber === levelTest.length - 1
                      ? "Finish Test"
                      : "Next"}
                  </Button>
                </FormControl>
              </AnimatePresence>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default LevelTest;
