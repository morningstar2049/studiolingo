import { useEffect, useState } from "react";

const prices = {
  "english-ინდივიდუალური-კვირაში 2-ჯერ": 990,
  "english-ინდივიდუალური-კვირაში 3-ჯერ": 1350,
  "english-ჯგუფური-კვირაში 2-ჯერ": 670,
  "english-ჯგუფური-კვირაში 3-ჯერ": 830,
  "german-ინდივიდუალური-კვირაში 2-ჯერ": 1080,
  "german-ინდივიდუალური-კვირაში 3-ჯერ": 1560,
  "german-ჯგუფური-კვირაში 2-ჯერ": 720,
  "german-ჯგუფური-კვირაში 3-ჯერ": 1040,
  "russian-ინდივიდუალური-კვირაში 2-ჯერ": 920,
  "russian-ინდივიდუალური-კვირაში 3-ჯერ": 1280,
  "russian-ჯგუფური-კვირაში 2-ჯერ": 600,
  "russian-ჯგუფური-კვირაში 3-ჯერ": 800,
  "chinese-ინდივიდუალური-კვირაში 2-ჯერ": 340,
  "chinese-ინდივიდუალური-კვირაში 3-ჯერ": 490,
  "chinese-ჯგუფური-კვირაში 2-ჯერ": 230,
  "chinese-ჯგუფური-კვირაში 3-ჯერ": 290,
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
