"use client";
import { useState } from "react";
import useCalculatePrice from "@/hooks/useCalculatePrice";
import CourseRadioInput from "./CourseRadioInput";

type CourseDetailsProps = {
  courseTitle: "english" | "german" | "chinese";
};

export default function CourseDetails(props: CourseDetailsProps) {
  const [selectedItems, setSelectedItems] = useState({
    "გაკვეთილის ტიპი": "",
    "გაკვეთილის სიხშირე": "",
  });

  const { price } = useCalculatePrice(props.courseTitle, selectedItems);

  return (
    <div className="flex flex-col gap-5">
      <strong className="text-lingo-green">კურსის ხანგრძლივობა - 4 თვე</strong>
      <strong className="text-lingo-black">
        გაკვეთილის ხანგრძლივობა - 1 სთ 30 წთ{" "}
        {props.courseTitle === "chinese" && "(ჯგუფური 2 სთ-მდე)"}
      </strong>
      {props.courseTitle === "english" && (
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
        კურსის სრული ღირებულება : <strong>{price} ლარი (4 თვის)</strong>
      </p>
      <section className="flex flex-col gap-2">
        <h1 className="font-bold text-lingo-green">გადახდის მეთოდები :</h1>
        <ul className="px-5 list-decimal">
          <li>
            წინასწარ ერთიანად - <strong>10%</strong> ფასდაკლება
          </li>
          <li>{props.courseTitle === "chinese" ? "სამ" : "ორ"} ნაწილად</li>
        </ul>
      </section>
    </div>
  );
}
