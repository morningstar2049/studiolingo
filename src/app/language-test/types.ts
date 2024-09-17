type TLevel = "A1" | "A2" | "B1" | "B1+" | "B2" | "C1" | "C2";

type TQuestion = {
  id: number;
  question: string;
  choices: string[];
  answer: string;
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
