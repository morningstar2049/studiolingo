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

// Per-level score: 7 multiple-choice questions x 1 point + 1 listening x 2.
type TLevelScore = {
  level: TLevel;
  points: number;
  max: number;
  answered: number;
  passed: boolean;
};

type TTestResult = {
  resultLevel: TLevel;
  levelScores: TLevelScore[];
  totalPoints: number;
  totalMax: number;
  listeningMistakes: number;
  stoppedByListening: boolean;
};

type TUserInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  contactMe: boolean;
};

// One answered question, sent with the result email so the school sees
// exactly what the visitor answered.
type TAnsweredQuestion = {
  id: number;
  level: TLevel;
  question: string;
  given: string;
  correct: string;
  isCorrect: boolean;
  listening: boolean;
  points: number;
  maxPoints: number;
};
