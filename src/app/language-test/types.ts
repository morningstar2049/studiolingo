type TLevel = "A1" | "A2" | "B1" | "B1+" | "B2" | "C1";

type TQuestion = {
  id: number;
  question: string;
  choices: string[];
  answer: number;
  level: TLevel;
  audioFile: string | null;
};

type TLevelTest = {
  levelTest: TQuestion[];
};

type TSubmittedAnswer = {
  answer: string | null;
  level: TLevel | null;
};

type TIncorrectAnswersCounter = Array<{ level: TLevel; count: number }>;
