// Price table shared by the course calculator and /buy-course.
// Key: "<course>-<format>-<lessonType>-<frequency>", e.g.
// "english-ონლაინ-ინდივიდუალური-კვირაში 2-ჯერ". Prices are edited in Sanity
// ("ფასი"); this table is only the fallback when Sanity is unreachable.

export type PriceTable = Record<string, number>;

export const priceKey = (...parts: (string | undefined)[]) =>
  parts.filter(Boolean).join("-");

export const fallbackPrices: PriceTable = {
  "english-ონლაინ-ინდივიდუალური-კვირაში 2-ჯერ": 1600,
  "english-ონლაინ-ინდივიდუალური-კვირაში 3-ჯერ": 2400,
  "english-ონლაინ-ორმოსწავლიანი-კვირაში 2-ჯერ": 1420,
  "english-ონლაინ-ჯგუფური-კვირაში 2-ჯერ": 980,
  "english-ოფისში-ჯგუფური-კვირაში 2-ჯერ": 840,
  "englishForTeens-ონლაინ-ჯგუფური-კვირაში 2-ჯერ": 980,
  "englishForTeens-ოფისში-ჯგუფური-კვირაში 2-ჯერ": 840,
  "englishForKids-ოფისში-ჯგუფური-კვირაში 2-ჯერ": 600,
  "englishForTeens-ონლაინ-ინდივიდუალური-კვირაში 2-ჯერ": 1600,
};
