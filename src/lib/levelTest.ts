import { getLevelTest, type LevelTestTextsDoc } from "@/sanity/queries";
import fallbackBank from "@/app/api/lang-test/questions.json";
import {
  FALLBACK_TEXTS,
  type LevelTestTexts,
} from "@/app/language-test/levelTestTexts";
import {
  EMAIL_FIELDS,
  FALLBACK_EMAIL,
  type EmailField,
  type LevelTestEmailConfig,
} from "@/app/api/level-test-result/email";

// The level test from Sanity: question bank, screen texts and result email.
// The page (to show the test), /api/lang-test (to grade it) and
// /api/level-test-result (to email it) all load it here, so they always agree.
// Questions: Sanity once it has at least one, else the copy in code. Texts:
// field by field — an empty Sanity field keeps the code text.

const LEVEL_ORDER: TLevel[] = ["A1", "A2", "B1", "B1+", "B2", "C1"];

const fallbackQuestions = (): TQuestion[] =>
  (fallbackBank.levelTest as TQuestion[]).map((q) =>
    q.audioFile ? { ...q, audioFile: `/audios/${q.audioFile}` } : q,
  );

const pick = (value: string | undefined, fallback: string) =>
  value?.trim() ? value : fallback;

function buildTexts(d: LevelTestTextsDoc): LevelTestTexts {
  const f = FALLBACK_TEXTS;
  const stats =
    d.introStats?.length === 4
      ? d.introStats.map((s, i) => ({
          value: pick(s.value, f.intro.stats[i].value),
          label: pick(s.label, f.intro.stats[i].label),
        }))
      : f.intro.stats;
  const desc = f.result.descriptions;
  return {
    badge: pick(d.badge, f.badge),
    intro: {
      headline: pick(d.introHeadline, f.intro.headline),
      subtitle: pick(d.introSubtitle, f.intro.subtitle),
      stats,
      listeningNote: pick(d.listeningNote, f.intro.listeningNote),
      speakingNote: pick(d.speakingNote, f.intro.speakingNote),
      startButton: pick(d.startButton, f.intro.startButton),
    },
    form: {
      headline: pick(d.formHeadline, f.form.headline),
      subtitle: pick(d.formSubtitle, f.form.subtitle),
      firstName: pick(d.firstNameLabel, f.form.firstName),
      lastName: pick(d.lastNameLabel, f.form.lastName),
      email: pick(d.emailLabel, f.form.email),
      phone: pick(d.phoneLabel, f.form.phone),
      age: pick(d.ageLabel, f.form.age),
      contactMe: pick(d.contactMeLabel, f.form.contactMe),
      submitButton: pick(d.submitButton, f.form.submitButton),
      privacyNote: pick(d.privacyNote, f.form.privacyNote),
    },
    question: {
      label: pick(d.questionLabel, f.question.label),
      listeningHint: pick(d.listeningHint, f.question.listeningHint),
      answerPlaceholder: pick(d.answerPlaceholder, f.question.answerPlaceholder),
      nextButton: pick(d.nextButton, f.question.nextButton),
      finishButton: pick(d.finishButton, f.question.finishButton),
    },
    result: {
      intro: pick(d.resultIntro, f.result.intro),
      detailsButton: pick(d.detailsButton, f.result.detailsButton),
      hideButton: pick(d.hideButton, f.result.hideButton),
      courseButton: pick(d.courseButton, f.result.courseButton),
      courseLink: pick(d.courseLink, f.result.courseLink),
      retakeButton: pick(d.retakeButton, f.result.retakeButton),
      descriptions: {
        "სრულიად დამწყები": pick(d.beginner, desc["სრულიად დამწყები"]),
        A1: pick(d.a1, desc.A1),
        A2: pick(d.a2, desc.A2),
        B1: pick(d.b1, desc.B1),
        "B1+": pick(d.b1plus, desc["B1+"]),
        B2: pick(d.b2, desc.B2),
        C1: pick(d.c1, desc.C1),
      },
    },
  };
}

function buildQuestions(
  docs: NonNullable<Awaited<ReturnType<typeof getLevelTest>>>["questions"],
): TQuestion[] {
  const questions: TQuestion[] = [];
  for (const level of LEVEL_ORDER) {
    for (const q of docs.filter((d) => d.level === level)) {
      if (q.kind === "listening") {
        if (!q.audioUrl || !q.listeningAnswer) continue;
        questions.push({
          id: q._id,
          level,
          question: q.question,
          choices: null,
          answer: q.listeningAnswer,
          alsoAccepted: (q.alsoAccepted ?? [])
            .filter((a) => a.answer?.trim())
            .map((a) => ({
              answer: a.answer!.trim(),
              points: Math.min(2, Math.max(1, a.points ?? 1)),
            })),
          audioFile: q.audioUrl,
        });
      } else {
        const choices = q.choices ?? [];
        const answer = q.correctOption ?? -1;
        if (choices.length < 2 || answer < 0 || answer >= choices.length)
          continue;
        questions.push({
          id: q._id,
          level,
          question: q.question,
          choices,
          answer,
          audioFile: null,
        });
      }
    }
  }
  return questions;
}

export async function loadLevelTest(): Promise<{
  questions: TQuestion[];
  texts: LevelTestTexts;
}> {
  const res = await getLevelTest();
  const texts = buildTexts(res?.texts ?? {});
  if (!res || res.total === 0) {
    return { questions: fallbackQuestions(), texts };
  }
  return { questions: buildQuestions(res.questions), texts };
}

// The result email: structure + recipients (null = the default recipient).
export async function loadLevelTestEmail(): Promise<{
  config: LevelTestEmailConfig;
  recipients: string[] | null;
}> {
  const d: LevelTestTextsDoc = (await getLevelTest())?.texts ?? {};
  const rows = (d.emailRows ?? [])
    .filter(
      (r): r is { field: EmailField; label: string } =>
        EMAIL_FIELDS.includes(r.field as EmailField) && !!r.label?.trim(),
    )
    .map((r) => ({ field: r.field, label: r.label }));
  const recipients = (d.emailRecipients ?? [])
    .map((r) => r.trim())
    .filter((r) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r));
  return {
    config: {
      subject: pick(d.emailSubject, FALLBACK_EMAIL.subject),
      heading: pick(d.emailHeading, FALLBACK_EMAIL.heading),
      rows: rows.length ? rows : FALLBACK_EMAIL.rows,
      includeAnswers: d.emailIncludeAnswers ?? FALLBACK_EMAIL.includeAnswers,
      answersHeading: pick(d.emailAnswersHeading, FALLBACK_EMAIL.answersHeading),
    },
    recipients: recipients.length ? recipients : null,
  };
}
