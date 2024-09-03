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
  "englishForTeens-კვირაში 2-ჯერ": 680,
  "englishForTeens-კვირაში 3-ჯერ": 840,
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
    // @ts-ignore
    price: prices[[lang, type, frequency].filter(Boolean).join("-")] || 0,
  };
}

export default useCalculatePrice;
