"use client";

import { useState } from "react";
import Button from "../Button";

type CourseDetailsProps = {
  courseTitle: "english" | "german" | "russian" | "chinese";
};

export default function CourseDetails(props: CourseDetailsProps) {
  const [price, setPrice] = useState(0);
  const [selected, setSelected] = useState("");
  return (
    <div>
      {(props.courseTitle === "english" || props.courseTitle === "russian") && (
        <section>
          <p>კურსის ტიპი:</p>
          {["ზოგადი", "სასაუბრო", "ბიზნესი", "IELTS"].map((item) => (
            <Button
              onClick={() => setSelected(item)}
              key={item}
              bg={selected === item ? "green" : "white"}
            >
              {item}
            </Button>
          ))}

          {/* {props.courseTitle === "english" && <Button>IELTS</Button>} */}
        </section>
      )}
      <section>
        <p>გაკვეთილის ტიპი:</p>
        <Button>ინდივიდუალური</Button>
        <Button>ჯგუფური</Button>
      </section>
      <section>
        <p>გაკვეთილის სიხშირე:</p>
        <Button>კვირაში 2-ჯერ</Button>
        <Button>კვირაში 3-ჯერ</Button>
      </section>
      <p>ფასი: {price}</p>
    </div>
  );
}
