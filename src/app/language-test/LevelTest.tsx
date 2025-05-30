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
import { CircularProgress, TextField } from "@mui/material";

const questionTimer = 40;
const audioQuestionTimer = 60;
let intervalId: NodeJS.Timer | undefined;
const incorrectAnswersCounter: TIncorrectAnswersCounter = [];

const levelsMap: Record<TLevel, string> = {
  "სრულიად დამწყები": "სრულიად დამწყები",
  A1: "საწყისი",
  A2: "საბაზისო",
  B1: "საშუალო",
  "B1+": "საშუალოზე მაღალი",
  B2: "მოწინავე",
  C1: "მაღალი",
};

const levelsArr = Object.keys(levelsMap) as TLevel[];

function LevelTest({ levelTest }: TLevelTest) {
  const [value, setValue] = useState("");
  const [questionNumber, setQuestionNumber] = useState(0);
  const currentQuestion = levelTest[questionNumber] || {};
  const [remainingTime, setRemainingTime] = useState(
    currentQuestion.audioFile ? audioQuestionTimer : questionTimer
  );
  const [testResult, setTestResult] = useState<TLevel>();
  const [isLoading, setIsLoading] = useState(false);

  const isTestFinished =
    incorrectAnswersCounter.reduce((prev, curr) => {
      return prev + curr.count;
    }, 0) === 5 || questionNumber === levelTest.length;

  const handleNextQuestion = useCallback(
    async (answer: string) => {
      const currentQuestion = levelTest[questionNumber];

      if (currentQuestion.audioFile === null) {
        if (answer !== currentQuestion.choices[currentQuestion.answer]) {
          const sameLevelQuestionIndex = incorrectAnswersCounter.findIndex(
            (el) => el.level === currentQuestion.level
          );
          if (sameLevelQuestionIndex >= 0) {
            incorrectAnswersCounter[sameLevelQuestionIndex].count += 1;
          } else {
            incorrectAnswersCounter.push({
              level: currentQuestion.level,
              count: 1,
            });
          }
        }
      } else {
        if (
          answer.trim().toLowerCase() !== currentQuestion.answer.toLowerCase()
        ) {
          const sameLevelQuestionIndex = incorrectAnswersCounter.findIndex(
            (el) => el.level === currentQuestion.level
          );
          if (sameLevelQuestionIndex >= 0) {
            incorrectAnswersCounter[sameLevelQuestionIndex].count += 1;
          } else {
            incorrectAnswersCounter.push({
              level: currentQuestion.level,
              count: 1,
            });
          }
        }
      }

      if (
        incorrectAnswersCounter.reduce((prev, curr) => {
          return prev + curr.count;
        }, 0) === 5 ||
        questionNumber === levelTest.length - 1
      ) {
        setIsLoading(true);
        const postReq = await fetch(`/api/lang-test`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(incorrectAnswersCounter),
        });

        const testResult: TTestResult = await postReq.json();

        setTestResult(testResult.resultLevel);
        setIsLoading(false);
      }

      setValue("");
      setQuestionNumber((prev) => prev + 1);
      setRemainingTime(
        levelTest[questionNumber + 1]?.audioFile
          ? audioQuestionTimer
          : questionTimer
      );
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

  useEffect(() => {
    typeof window !== undefined && window.scrollTo(0, 0);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleNextQuestion(value);
  };

  if (isLoading) {
    return <CircularProgress sx={{ color: "#2f9e4d" }} />;
  }

  return (
    <div>
      {isTestFinished ? (
        <div className="text-xl text-lingo-black text-center">
          {testResult === "C1" ? (
            <>
              თქვენი ინგლისურის მიახლოებითი დონეა{" "}
              <strong className="text-lingo-green text-xl">
                {testResult} ({levelsMap[testResult as TLevel]})
              </strong>
            </>
          ) : (
            <>
              თქვენი ინგლისურის მიახლოებითი დონეა{" "}
              <strong className="text-lingo-green text-2xl">
                {testResult}
              </strong>{" "}
              {testResult !== "სრულიად დამწყები"
                ? `(${levelsMap[testResult as TLevel]}) `
                : ""}
              და შეგიძლიათ დაიწყოთ{" "}
              <strong className="text-lingo-green text-2xl">
                {levelsArr[levelsArr.findIndex((el) => el === testResult) + 1]}
              </strong>{" "}
              (
              {
                levelsMap[
                  levelsArr[levelsArr.findIndex((el) => el === testResult) + 1]
                ]
              }
              ) დონის სწავლა.
            </>
          )}
        </div>
      ) : (
        <>
          <div className="text-2xl text-lingo-green text-center font-bold mt-5 mb-16 w-[100px] mx-auto">
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
                  <FormLabel
                    sx={{
                      fontSize: "20px",
                      color: "#000",
                      textAlign: "center",
                    }}
                  >
                    {currentQuestion.question}
                  </FormLabel>
                  {!currentQuestion.audioFile ? (
                    <RadioGroup
                      name="levelTest"
                      value={value}
                      onChange={handleChange}
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
                        {currentQuestion.choices &&
                          currentQuestion.choices.map((item) => (
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
                  ) : (
                    <>
                      <audio
                        controls
                        src={`/audios/${currentQuestion.audioFile}`}
                      />
                      <TextField
                        label="Your Answer"
                        value={value}
                        onChange={handleChange}
                        color="success"
                      />
                    </>
                  )}
                  <Button
                    disabled={!value}
                    type="submit"
                    variant="soft"
                    className="bg-lingo-green hover:bg-[#2f904d] w-[200px] mx-auto"
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
