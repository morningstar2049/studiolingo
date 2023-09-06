import { useEffect, useState } from "react";

const prices = {
  "english-ინდივიდუალური-კვირაში 2-ჯერ": 260,
  "english-ინდივიდუალური-კვირაში 3-ჯერ": 330,
  "english-ჯგუფური-კვირაში 2-ჯერ": 160,
  "english-ჯგუფური-კვირაში 3-ჯერ": 200,
  "german-ინდივიდუალური-კვირაში 2-ჯერ": 270,
  "german-ინდივიდუალური-კვირაში 3-ჯერ": 390,
  "german-ჯგუფური-კვირაში 2-ჯერ": 180,
  "german-ჯგუფური-კვირაში 3-ჯერ": 260,
  "russian-ინდივიდუალური-კვირაში 2-ჯერ": 230,
  "russian-ინდივიდუალური-კვირაში 3-ჯერ": 320,
  "russian-ჯგუფური-კვირაში 2-ჯერ": 150,
  "russian-ჯგუფური-კვირაში 3-ჯერ": 200,
  "chinese-ინდივიდუალური-კვირაში 2-ჯერ": 340,
  "chinese-ინდივიდუალური-კვირაში 3-ჯერ": 490,
  "chinese-ჯგუფური-კვირაში 2-ჯერ": 230,
  "chinese-ჯგუფური-კვირაში 3-ჯერ": 330,
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
