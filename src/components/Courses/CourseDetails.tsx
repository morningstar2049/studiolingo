"use client";

import { useState } from "react";
import useCalculatePrice from "@/hooks/useCalculatePrice";
import CourseRadioInput from "./CourseRadioInput";

type CourseDetailsProps = {
  courseTitle: "english" | "german" | "russian" | "chinese";
};

export default function CourseDetails(props: CourseDetailsProps) {
  const [selectedItems, setSelectedItems] = useState({
    "გაკვეთილის ტიპი": "",
    "გაკვეთილის სიხშირე": "",
  });

  const { price } = useCalculatePrice(props.courseTitle, selectedItems);

  return (
    <div className="flex flex-col gap-5">
      {(props.courseTitle === "german" || props.courseTitle === "chinese") && (
        <strong className="text-lingo-green">
          კურსის ხანგრძლივობა - 4 თვე
        </strong>
      )}
      {(props.courseTitle === "english" || props.courseTitle === "russian") && (
        <section>
          <CourseRadioInput
            title="კურსის ტიპი"
            choices={
              props.courseTitle === "english"
                ? ["ზოგადი", "სასაუბრო", "ბიზნესი", "IELTS"]
                : ["ზოგადი", "სასაუბრო", "ბიზნესი"]
            }
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </section>
      )}
      <section>
        <CourseRadioInput
          title="გაკვეთილის ტიპი"
          choices={["ინდივიდუალური", "ჯგუფური"]}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </section>
      <section>
        <CourseRadioInput
          title="გაკვეთილის სიხშირე"
          choices={["კვირაში 2-ჯერ", "კვირაში 3-ჯერ"]}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </section>
      <p>
        {props.courseTitle === "german" || props.courseTitle === "chinese"
          ? "კურსის სრული ღირებულება : "
          : "ფასი თვიურად :"}{" "}
        <strong>{price} ლარი</strong>
      </p>
    </div>
  );
}
