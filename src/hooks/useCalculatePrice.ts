import { useEffect, useState } from "react";

function useCalculatePrice(
  courseTitle: string,
  selectedItems: {
    "გაკვეთილის ტიპი": string;
    "გაკვეთილის სიხშირე": string;
  }
) {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    function calculatePrice() {
      switch (courseTitle) {
        case "english":
          if (
            selectedItems["გაკვეთილის ტიპი"] === "ინდივიდუალური" &&
            selectedItems["გაკვეთილის სიხშირე"] === "კვირაში 2-ჯერ"
          ) {
            setPrice(240);
          }
          if (
            selectedItems["გაკვეთილის ტიპი"] === "ინდივიდუალური" &&
            selectedItems["გაკვეთილის სიხშირე"] === "კვირაში 3-ჯერ"
          ) {
            setPrice(330);
          }
          if (
            selectedItems["გაკვეთილის ტიპი"] === "ჯგუფური" &&
            selectedItems["გაკვეთილის სიხშირე"] === "კვირაში 2-ჯერ"
          ) {
            setPrice(160);
          }
          if (
            selectedItems["გაკვეთილის ტიპი"] === "ჯგუფური" &&
            selectedItems["გაკვეთილის სიხშირე"] === "კვირაში 3-ჯერ"
          ) {
            setPrice(200);
          }
          break;
        case "german":
          if (
            selectedItems["გაკვეთილის ტიპი"] === "ინდივიდუალური" &&
            selectedItems["გაკვეთილის სიხშირე"] === "კვირაში 2-ჯერ"
          ) {
            setPrice(270);
          }
          if (
            selectedItems["გაკვეთილის ტიპი"] === "ინდივიდუალური" &&
            selectedItems["გაკვეთილის სიხშირე"] === "კვირაში 3-ჯერ"
          ) {
            setPrice(390);
          }
          if (
            selectedItems["გაკვეთილის ტიპი"] === "ჯგუფური" &&
            selectedItems["გაკვეთილის სიხშირე"] === "კვირაში 2-ჯერ"
          ) {
            setPrice(180);
          }
          if (
            selectedItems["გაკვეთილის ტიპი"] === "ჯგუფური" &&
            selectedItems["გაკვეთილის სიხშირე"] === "კვირაში 3-ჯერ"
          ) {
            setPrice(260);
          }
          break;
        case "russian":
          if (
            selectedItems["გაკვეთილის ტიპი"] === "ინდივიდუალური" &&
            selectedItems["გაკვეთილის სიხშირე"] === "კვირაში 2-ჯერ"
          ) {
            setPrice(230);
          }
          if (
            selectedItems["გაკვეთილის ტიპი"] === "ინდივიდუალური" &&
            selectedItems["გაკვეთილის სიხშირე"] === "კვირაში 3-ჯერ"
          ) {
            setPrice(320);
          }
          if (
            selectedItems["გაკვეთილის ტიპი"] === "ჯგუფური" &&
            selectedItems["გაკვეთილის სიხშირე"] === "კვირაში 2-ჯერ"
          ) {
            setPrice(150);
          }
          if (
            selectedItems["გაკვეთილის ტიპი"] === "ჯგუფური" &&
            selectedItems["გაკვეთილის სიხშირე"] === "კვირაში 3-ჯერ"
          ) {
            setPrice(200);
          }
          break;

        case "chinese":
          if (
            selectedItems["გაკვეთილის ტიპი"] === "ინდივიდუალური" &&
            selectedItems["გაკვეთილის სიხშირე"] === "კვირაში 2-ჯერ"
          ) {
            setPrice(340);
          }
          if (
            selectedItems["გაკვეთილის ტიპი"] === "ინდივიდუალური" &&
            selectedItems["გაკვეთილის სიხშირე"] === "კვირაში 3-ჯერ"
          ) {
            setPrice(490);
          }
          if (
            selectedItems["გაკვეთილის ტიპი"] === "ჯგუფური" &&
            selectedItems["გაკვეთილის სიხშირე"] === "კვირაში 2-ჯერ"
          ) {
            setPrice(230);
          }
          if (
            selectedItems["გაკვეთილის ტიპი"] === "ჯგუფური" &&
            selectedItems["გაკვეთილის სიხშირე"] === "კვირაში 3-ჯერ"
          ) {
            setPrice(330);
          }
          break;
      }
    }
    calculatePrice();
  }, [selectedItems, courseTitle]);

  return {
    price,
  };
}

export default useCalculatePrice;
