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

const questionTimer = 40;
let intervalId: NodeJS.Timer | undefined;
const incorrectAnswersCounter: TIncorrectAnswersCounter = [];
let level: TLevel;

function LevelTest({ levelTest }: TLevelTest) {
  console.log(incorrectAnswersCounter, "incorrectAnswersCounter");

  const [value, setValue] = useState("");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [remainingTime, setRemainingTime] = useState(questionTimer);

  const isTestFinished =
    incorrectAnswersCounter.reduce((prev, curr) => {
      return prev + curr.count;
    }, 0) === 5 || questionNumber === levelTest.length;

  const handleNextQuestion = useCallback(
    async (answer: string) => {
      const question = levelTest[questionNumber];

      if (answer !== question.choices[question.answer]) {
        const sameLevelQuestionIndex = incorrectAnswersCounter.findIndex(
          (el) => el.level === question.level
        );
        if (sameLevelQuestionIndex >= 0) {
          incorrectAnswersCounter[sameLevelQuestionIndex].count += 1;
        } else {
          incorrectAnswersCounter.push({
            level: question.level,
            count: 1,
          });
        }
      }

      if (
        incorrectAnswersCounter.reduce((prev, curr) => {
          //TODO: add logic when there are not 5 mistakes and test is finished.
          return prev + curr.count;
        }, 0) === 5
      ) {
        // handleFindLevel(incorrectAnswersCounter);
        const postReq = await fetch("http://localhost:4000/api/lang-test", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(incorrectAnswersCounter),
        });

        const testResult = await postReq.json();

        console.log(testResult);

        return;
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
