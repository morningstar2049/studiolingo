import { useEffect, useState } from "react";

const prices = {
  "english-ინდივიდუალური-კვირაში 2-ჯერ": 960,
  "english-ინდივიდუალური-კვირაში 3-ჯერ": 1320,
  "english-ჯგუფური-კვირაში 2-ჯერ": 640,
  "english-ჯგუფური-კვირაში 3-ჯერ": 800,
  "german-ინდივიდუალური-კვირაში 2-ჯერ": 1080,
  "german-ინდივიდუალური-კვირაში 3-ჯერ": 1560,
  "german-ჯგუფური-კვირაში 2-ჯერ": 720,
  "german-ჯგუფური-კვირაში 3-ჯერ": 1040,
  "russian-ინდივიდუალური-კვირაში 2-ჯერ": 920,
  "russian-ინდივიდუალური-კვირაში 3-ჯერ": 1280,
  "russian-ჯგუფური-კვირაში 2-ჯერ": 600,
  "russian-ჯგუფური-კვირაში 3-ჯერ": 800,
  "chinese-ინდივიდუალური-კვირაში 2-ჯერ": 1360,
  "chinese-ინდივიდუალური-კვირაში 3-ჯერ": 1960,
  "chinese-ჯგუფური-კვირაში 2-ჯერ": 920,
  "chinese-ჯგუფური-კვირაში 3-ჯერ": 1360,
};

function useCalculatePrice(
  courseTitle: string,
  selectedItems: {
    "გაკვეთილის ტიპი": string;
    "გაკვეთილის სიხშირე": string;
  }
) {
  const [price, setPrice] = useState(0);

  const lang = courseTitle;
  const type = selectedItems["გაკვეთილის ტიპი"];
  const frequency = selectedItems["გაკვეთილის სიხშირე"];

  useEffect(() => {
    // @ts-ignore
    setPrice(prices[[lang, type, frequency].join("-")] || 0);
  }, [frequency, lang, type]);

  return {
    price,
  };
}

export default useCalculatePrice;
