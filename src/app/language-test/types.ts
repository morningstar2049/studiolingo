type TLevel = "სრულიად დამწყები" | "A1" | "A2" | "B1" | "B1+" | "B2" | "C1";

type TQuestion =
  | {
      id: number;
      question: string;
      choices: string[];
      answer: number;
      level: TLevel;
      audioFile: null;
    }
  | {
      id: number;
      question: string;
      choices: null;
      answer: string;
      level: TLevel;
      audioFile: string;
    };

type TLevelTest = {
  levelTest: TQuestion[];
};

type TSubmittedAnswer = {
  answer: string | null;
  level: TLevel | null;
};

type TIncorrectAnswersCounter = Array<{ level: TLevel; count: number }>;

type TTestResult = {
  resultLevel: TLevel;
};
