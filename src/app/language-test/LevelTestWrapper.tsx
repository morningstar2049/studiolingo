"use client";
import { useState } from "react";
import LevelTest from "./LevelTest";
import Button from "@/components/Button";

export default function LevelTestWrapper({ levelTest }: TLevelTest) {
  const [startTest, setStartTest] = useState(false);

  return (
    <>
      {startTest ? (
        <LevelTest levelTest={levelTest} />
      ) : (
        <div className="flex flex-col gap-10 p-2 lg:max-w-[500px]">
          <div>
            <p>
              ინგლისურის დონის ტესტი შედგება 48 კითხვისგან - თითო კითხვაზე
              საპასუხოდ გაქვთ 40-60 წმ, თუმცა ყველა კითხვაზე პასუხის გაცემა,
              სავარაუდოდ, არ იქნება საჭირო. სისტემა გამოგიყვანთ, როგორც კი
              თქვენს მიახლოებით დონეს დაადგენს თქვენი პასუხების მიხედვით.
            </p>
            <br />
            <p>
              რამდენიმე კითხვა არის ღია ტიპის მოსასმენი, რომლის პასუხიც უნდა
              ჩაწეროთ მოცემულ ველში. ასეთ კითხვებს ექნებათ ნიშანი 🔈, უნდა
              ჩართოთ იქვე მოცემული აუდიო და მოსმენილის საფუძველზე ჩაწეროთ სწორი
              პასუხი. ასეთ კითხვებზე საპასუხოდ გაქვთ 60 წმ.
            </p>
            <br />
            <p>
              <strong className="text-lingo-green">გაითვალისწინეთ:</strong>{" "}
              ტესტი ადგენს მიახლოებით დონეს C1 დონის ჩათვლით. მეტი სიზუსტისთვის
              უმჯობესია დეტალური ზეპირი შემოწმებაც.
            </p>
            <br />
            <p>აბა წარმატებები!</p>
          </div>
          <Button onClick={() => setStartTest(true)}>ტესტის დაწყება</Button>
        </div>
      )}
    </>
  );
}
