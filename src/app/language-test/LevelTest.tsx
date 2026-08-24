"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import { FaCheckCircle, FaRegClock, FaVolumeUp, FaCheck } from "react-icons/fa";
import AudioPlayer from "./AudioPlayer";

const questionTimer = 40;
const audioQuestionTimer = 60;
let intervalId: NodeJS.Timer | undefined;
const incorrectAnswersCounter: TIncorrectAnswersCounter = [];

const levelsMap: Record<TLevel, string> = {
  "სრულიად დამწყები": "Beginner",
  A1: "Elementary -",
  A2: "Elementary",
  B1: "Intermediate",
  "B1+": "Intermediate +",
  B2: "Intermediate +",
  C1: "Advanced",
};

const levelsArr = Object.keys(levelsMap) as TLevel[];

// Result scale tiers (no CEFR codes) and which tier each detected level maps to.
const resultTiers = ["Beginner", "Elementary", "Intermediate", "Advanced"];
const tierIndexMap: Record<TLevel, number> = {
  "სრულიად დამწყები": 0,
  A1: 1,
  A2: 1,
  B1: 2,
  "B1+": 2,
  B2: 2,
  C1: 3,
};

// The level a visitor should START at — one step above their result — sent in
// the result email ("უნდა დაიწყოს"). C1 is already the top.
const nextLevelLabel: Record<TLevel, string> = {
  "სრულიად დამწყები": "Elementary - (A1)",
  A1: "Elementary (A2)",
  A2: "Intermediate (B1)",
  B1: "Intermediate + (B1+/B2)",
  "B1+": "Advanced (C1)",
  B2: "Advanced (C1)",
  C1: "Advanced (C1)",
};

// Per-level detail text shown under "დეტალურად ამ დონის შესახებ" on the result
// screen. B1+ and B2 share the "Intermediate +" copy.
const intermediatePlus =
  "ეს არის საშუალოზე მაღალი დონე. მშვენიერი შედეგია! შენ ალბათ თავისუფლად და სპონტანურადაც კი ესაუბრები უცხოელებს და მარტივად იგებ რთულ ტექსტებს. ჩანს, გრამატიკაშიც სერიოზულად ფლობ ბევრ საკითხს და შეიძლება საუბარშიც კი იცოდე გრამატიკის სწორად გამოყენება. შემოგვიერთდი „სტუდიო ლინგოში“ და გახადე შენი ინგლისური კიდევ უფრო სრულყოფილი და პროფესიული.";

const levelDescriptions: Partial<Record<TLevel, string>> = {
  "სრულიად დამწყები":
    "ეს არის სრულიად დამწყები დონე. ინგლისურთან შეხება ალბათ ჯერ თითქმის არ გქონია და მხოლოდ რამდენიმე სიტყვა იცი. ყველაფერი წინ არის! სრულიად ნულიდანაც გასწავლით ყველაფერს, თუ საჭირო იქნება. შემოგვიერთდი „სტუდიო ლინგოში“ და ერთად დავიწყოთ ეს საინტერესო თავგადასავალი.",
  A1: "ეს არის საბაზისო დონე. როგორც ჩანს, შენ უკვე შეგიძლია მარტივი, ყოველდღიური ფრაზების რაღაც დონეზე გაგება. გრამატიკის საწყისებიც იცი და შეიძლება საკუთარი თავის საბაზისო დონეზე წარდგენასაც ახერხებ. ახლა კი შეგიძლია ეს ბაზაც განიმტკიცო. დაიწყე სწავლა „სტუდიო ლინგოში“ და თამამად გადადგი ნაბიჯი შემდეგი დონისკენ.",
  A2: "ეს არის საბაზისოზე მაღალი დონე. ჩანს, შენ კარგად გესმის ყოველდღიური ფრაზები და იცი სიტყვები ნაცნობ თემებზე. გრამატიკაშიც გქონია გარკვეული ტიპის ცოდნა. კომუნიკაციაც შეიძლება არ გიჭირდეს თუ ამ ცოდნის სწორად გამოყენება იცი. „სტუდიო ლინგოში“ სიამოვნებით დაგეხმარებით, რომ შენი ინგლისური კიდევ უფრო გამართული და დამაჯერებელი გახდეს.",
  B1: "ეს არის საშუალო საკომუნიკაციო დონე. ყოჩაღ! შენ უკვე კარგად იცი ყოველდღიური ფრაზები და მოგზაურობის დროსაც ალბათ იყენებ კიდეც. გრამატიკაშიც გაქვს გარკვეული ცოდნა. თუ გინდა ენა უფრო პროფესიულ დონეზე აიყვანო და საუბარშიც უფრო თავდაჯერებული იყო, „სტუდიო ლინგო“ დაგეხმარება, დაძლიო ბარიერები და ისაუბრო სრულიად თავისუფლად!",
  "B1+": intermediatePlus,
  B2: intermediatePlus,
  C1: "შენ აჩვენე მაღალი დონე. ფაქტობრივად, ინგლისურად ფიქრობ! მარტივად იჭერ ქვეტექსტებს და აზრს წამიერად, ბუნებრივად გამოხატავ. შენ უკვე ინგლისურის მაღალ დონეზე მცოდნე ხარ! თუ ენობრივი პრაქტიკის შენარჩუნება ან უნარების კიდევ უფრო დახვეწა გსურს, „სტუდიო ლინგოს“ კარი შენთვის ყოველთვის ღიაა.",
};

function LevelTest({
  levelTest,
  userInfo,
}: TLevelTest & { userInfo: TUserInfo }) {
  const [value, setValue] = useState("");
  const [questionNumber, setQuestionNumber] = useState(0);
  const currentQuestion = levelTest[questionNumber] || {};
  const [remainingTime, setRemainingTime] = useState(
    currentQuestion.audioFile ? audioQuestionTimer : questionTimer,
  );
  const [testResult, setTestResult] = useState<TLevel>();
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

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
            (el) => el.level === currentQuestion.level,
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
            (el) => el.level === currentQuestion.level,
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
          : questionTimer,
      );
    },
    [levelTest, questionNumber],
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

  // Email the visitor's details + result to the school once, when the test
  // finishes. Fire-and-forget: a mail failure never blocks the result screen.
  const resultSentRef = useRef(false);
  useEffect(() => {
    if (!testResult || resultSentRef.current) return;
    resultSentRef.current = true;
    fetch("/api/level-test-result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        result: levelsMap[testResult],
        level: testResult,
        recommendedLevel: nextLevelLabel[testResult],
      }),
    }).catch(() => {});
  }, [testResult, userInfo]);

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
    <div className="w-full my-auto">
      {isTestFinished ? (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFeatureSettings: "'case' on" }}
          className="w-full max-w-[470px] mx-auto rounded-[22px] bg-[#fff] border border-[#eceef2] shadow-[0_20px_46px_-22px_rgba(41,49,66,0.3)] p-6 sm:p-8 text-center"
        >
          <div className="flex items-center justify-center mx-auto text-3xl rounded-full w-14 h-14 bg-lingo-green/10 text-lingo-green">
            <FaCheckCircle />
          </div>
          <p className="mt-4 text-sm text-[#6b7280]">
            თქვენი ინგლისურის მიახლოებითი დონეა
          </p>
          <div className="mt-1.5 text-[30px] sm:text-[38px] font-bold leading-tight text-lingo-black">
            {levelsMap[testResult as TLevel]}
          </div>

          <div className="mt-7">
            <div className="flex gap-1.5">
              {resultTiers.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-full h-2.5"
                  style={{
                    background:
                      i < tierIndexMap[testResult as TLevel]
                        ? "#a7ddba"
                        : i === tierIndexMap[testResult as TLevel]
                        ? "#2f9e4d"
                        : "#eceef2",
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10.5px]">
              {resultTiers.map((tierLabel, i) => (
                <span
                  key={tierLabel}
                  className={
                    i === tierIndexMap[testResult as TLevel]
                      ? "font-bold text-lingo-green"
                      : "text-[#8a929d]"
                  }
                >
                  {tierLabel}
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowDetails((v) => !v)}
            className="w-full py-3 mt-7 font-bold transition-all rounded-xl text-lingo-green ring-1 ring-lingo-green hover:bg-lingo-green/5"
          >
            {showDetails ? "დამალვა" : "დეტალურად ამ დონის შესახებ"}
          </button>
          {showDetails && (
            <div
              style={{ fontFeatureSettings: "normal" }}
              className="p-4 mt-3 text-sm leading-relaxed text-left rounded-xl text-[#4b5563] bg-[#f6f8f7] whitespace-pre-line"
            >
              {levelDescriptions[testResult as TLevel] ||
                "ამ დონის დეტალური აღწერა მალე დაემატება."}
            </div>
          )}

          <a
            href="/courses"
            className="block py-3.5 mt-4 font-bold text-[#fff] transition-all rounded-xl bg-lingo-green shadow-lg shadow-lingo-green/25 hover:bg-[#2f904d] hover:scale-[1.02]"
          >
            დაიწყე შესაბამისი კურსი →
          </a>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 text-[13px] text-[#8a929d] transition-colors hover:text-lingo-green"
          >
            ↻ ტესტის თავიდან გავლა
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-[520px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={questionNumber}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ fontFeatureSettings: "'case' on" }}
              className="rounded-[24px] bg-[#fff] border border-[#eceef2] shadow-[0_24px_54px_-22px_rgba(41,49,66,0.3)] p-6 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.08em] uppercase text-[#8a929d]">
                  კითხვა {questionNumber + 1}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold ${
                    remainingTime <= 10
                      ? "bg-[#fdecec] text-[#e24b4a]"
                      : "bg-lingo-green/10 text-lingo-green"
                  }`}
                >
                  <FaRegClock className="text-xs" />
                  0:{remainingTime < 10 ? `0${remainingTime}` : remainingTime}
                </span>
              </div>

              <h2 className="mt-5 text-lg font-bold leading-snug text-center sm:text-xl text-lingo-black">
                {currentQuestion.question}
              </h2>

              {!currentQuestion.audioFile ? (
                <div className="flex flex-col gap-2.5 mt-6">
                  {currentQuestion.choices?.map((item, i) => {
                    const selected = value === item;
                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setValue(item)}
                        style={{ WebkitTapHighlightColor: "transparent" }}
                        className={`flex appearance-none items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-colors ${
                          selected
                            ? "border-lingo-green bg-[#f2faf5]"
                            : "border-[#eceef2] bg-[#fff] sm:hover:border-[#bfe6cb]"
                        }`}
                      >
                        <span
                          className={`flex items-center justify-center w-6 h-6 text-xs font-bold rounded-md shrink-0 ${
                            selected
                              ? "bg-lingo-green text-[#fff]"
                              : "bg-[#f1f3f6] text-[#6b7280]"
                          }`}
                        >
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span
                          className={`text-[15px] text-lingo-black ${
                            selected ? "font-bold" : ""
                          }`}
                        >
                          {item}
                        </span>
                        {selected && (
                          <FaCheck className="ml-auto text-lingo-green shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-6">
                  <p className="flex items-center justify-center gap-2 mb-4 text-sm font-bold text-lingo-green">
                    <FaVolumeUp /> მოისმინე და ჩაწერე პასუხი
                  </p>
                  <AudioPlayer src={`/audios/${currentQuestion.audioFile}`} />
                  <input
                    value={value}
                    onChange={handleChange}
                    placeholder="შენი პასუხი…"
                    className="w-full px-4 py-3 mt-4 text-base border border-[#eceef2] rounded-xl outline-none transition-colors appearance-none focus:border-lingo-green"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={!value}
                className="w-full py-3.5 mt-6 font-bold text-[#fff] transition-all rounded-xl appearance-none bg-lingo-green shadow-lg shadow-lingo-green/25 hover:bg-[#2f904d] hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {questionNumber === levelTest.length - 1
                  ? "დასრულება"
                  : "შემდეგი →"}
              </button>
            </motion.div>
          </AnimatePresence>
        </form>
      )}
    </div>
  );
}

export default LevelTest;
