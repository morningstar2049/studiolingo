// Price table shared by the course calculator and /buy-course.
// Key: "<course>-<format>-<lessonType>-<frequency>", e.g.
// "english-ონლაინ-ინდივიდუალური-კვირაში 2-ჯერ". Prices are edited in Sanity
// ("ფასი"); this table is only the fallback when Sanity is unreachable.

export type PriceTable = Record<string, number>;

export const priceKey = (...parts: (string | undefined)[]) =>
  parts.filter(Boolean).join("-");

// Minimum study period per price, in months. Sanity ("კურსის ფასი" →
// ხანგრძლივობა) overrides these; onsite courses run 3 months today, online 4.
export type MonthsTable = Record<string, number>;

export const DEFAULT_MONTHS: Record<string, number> = {
  ოფისში: 3,
  ონლაინ: 4,
};

/** Months for a price key, from the table or the format's default. */
export const monthsFor = (
  key: string,
  months?: MonthsTable,
): number => {
  const fromTable = months?.[key];
  if (fromTable) return fromTable;
  const format = key.split("-")[1];
  return DEFAULT_MONTHS[format] ?? 4;
};

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
