const prices = {
  "english-ორ მოსწავლიანი-კვირაში 2-ჯერ": 1360,
  // "english-ორ მოსწავლიანი-კვირაში 3-ჯერ": 1600,
  "english-ჯგუფური-კვირაში 2-ჯერ": 920,
  // "english-ჯგუფური-კვირაში 3-ჯერ": 840,
  "german-ორ მოსწავლიანი-კვირაში 2-ჯერ": 1080,
  "german-ორ მოსწავლიანი-კვირაში 3-ჯერ": 1560,
  "german-ჯგუფური-კვირაში 2-ჯერ": 720,
  "german-ჯგუფური-კვირაში 3-ჯერ": 1040,
  "russian-ორ მოსწავლიანი-კვირაში 2-ჯერ": 920,
  "russian-ორ მოსწავლიანი-კვირაში 3-ჯერ": 1280,
  "russian-ჯგუფური-კვირაში 2-ჯერ": 600,
  "russian-ჯგუფური-კვირაში 3-ჯერ": 800,
  "englishForTeens-ჯგუფური-კვირაში 2-ჯერ": 920,
  // "englishForTeens-ჯგუფური-კვირაში 3-ჯერ": 880,
  "englishForTeens-ორ მოსწავლიანი-კვირაში 2-ჯერ": 1360,
  // "englishForTeens-ორ მოსწავლიანი-კვირაში 3-ჯერ": 1600,
};

function useCalculatePrice(
  courseTitle: string,
  selectedItems: {
    "გაკვეთილის ტიპი": string;
    "გაკვეთილის სიხშირე": string;
  }
) {
  const lang = courseTitle;
  const type = selectedItems["გაკვეთილის ტიპი"];
  const frequency = selectedItems["გაკვეთილის სიხშირე"];

  return {
    price:
      prices[
        [lang, type, frequency].filter(Boolean).join("-") as keyof typeof prices
      ] || 0,
  };
}

export default useCalculatePrice;
