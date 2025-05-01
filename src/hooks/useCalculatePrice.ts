const prices = {
  "english-ინდივიდუალური-კვირაში 2-ჯერ": 1050,
  // "english-ინდივიდუალური-კვირაში 3-ჯერ": 1600,
  "english-ჯგუფური-კვირაში 2-ჯერ": 735,
  // "english-ჯგუფური-კვირაში 3-ჯერ": 840,
  // "german-ინდივიდუალური-კვირაში 2-ჯერ": 1080,
  // "german-ინდივიდუალური-კვირაში 3-ჯერ": 1560,
  // "german-ჯგუფური-კვირაში 2-ჯერ": 720,
  // "german-ჯგუფური-კვირაში 3-ჯერ": 1040,
  // "russian-ინდივიდუალური-კვირაში 2-ჯერ": 980,
  // "russian-ინდივიდუალური-კვირაში 3-ჯერ": 1280,
  // "russian-ჯგუფური-კვირაში 2-ჯერ": 600,
  // "russian-ჯგუფური-კვირაში 3-ჯერ": 800,
  "englishForTeens-ჯგუფური-კვირაში 2-ჯერ": 735,
  // "englishForTeens-ჯგუფური-კვირაში 3-ჯერ": 880,
  "englishForTeens-ინდივიდუალური-კვირაში 2-ჯერ": 1050,
  // "englishForTeens-ინდივიდუალური-კვირაში 3-ჯერ": 1600,
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
