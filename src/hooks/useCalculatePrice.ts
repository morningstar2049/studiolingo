const prices = {
  "english-ონლაინ-ინდივიდუალური-კვირაში 2-ჯერ": 1600,
  "english-ონლაინ-ინდივიდუალური-კვირაში 3-ჯერ": 2400,
  "english-ონლაინ-ჯგუფური-კვირაში 2-ჯერ": 980,
  "english-ოფისში-ჯგუფური-კვირაში 2-ჯერ": 840,
  // "english-ჯგუფური-კვირაში 3-ჯერ": 840,
  // "german-ინდივიდუალური-კვირაში 2-ჯერ": 1080,
  // "german-ინდივიდუალური-კვირაში 3-ჯერ": 1560,
  // "german-ჯგუფური-კვირაში 2-ჯერ": 720,
  // "german-ჯგუფური-კვირაში 3-ჯერ": 1040,
  // "russian-ინდივიდუალური-კვირაში 2-ჯერ": 980,
  // "russian-ინდივიდუალური-კვირაში 3-ჯერ": 1280,
  // "russian-ჯგუფური-კვირაში 2-ჯერ": 600,
  // "russian-ჯგუფური-კვირაში 3-ჯერ": 800,
  "englishForTeens-ონლაინ-ჯგუფური-კვირაში 2-ჯერ": 980,
  "englishForTeens-ოფისში-ჯგუფური-კვირაში 2-ჯერ": 840,
  // "englishForTeens-ჯგუფური-კვირაში 3-ჯერ": 880,
  "englishForTeens-ონლაინ-ინდივიდუალური-კვირაში 2-ჯერ": 1600,
  // "englishForTeens-ინდივიდუალური-კვირაში 3-ჯერ": 1600,
};

function useCalculatePrice(
  courseTitle: string,
  selectedItems: {
    "გაკვეთილის ტიპი": string;
    "გაკვეთილის სიხშირე": string;
    "კურსის ფორმატი": string;
  }
) {
  const lang = courseTitle;
  const format = selectedItems["კურსის ფორმატი"];
  const type = selectedItems["გაკვეთილის ტიპი"];
  const frequency = selectedItems["გაკვეთილის სიხშირე"];

  console.log(
    [lang, format, type, frequency]
      .filter(Boolean)
      .join("-") as keyof typeof prices,
    "calculated price"
  );

  return {
    price:
      prices[
        [lang, format, type, frequency]
          .filter(Boolean)
          .join("-") as keyof typeof prices
      ] || 0,
  };
}

export default useCalculatePrice;
