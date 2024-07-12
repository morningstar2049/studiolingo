"use client";
import { useState } from "react";
import useCalculatePrice from "@/hooks/useCalculatePrice";
import CourseRadioInput from "./CourseRadioInput";

type CourseDetailsProps = {
  courseTitle: "english" | "german" | "chinese";
};

const courseDescriptions: {
  english: JSX.Element;
  german: JSX.Element;
  chinese: JSX.Element;
} = {
  english: (
    <div style={{ fontFeatureSettings: "normal" }}>
      <p>
        ინგლისური ენის კურსი ითვალისწინებს პრაქტიკულ და ინტერაქციულ მუშაობას
        მოსწავლეებთან: საუბარი, დიალოგი მიმდინარეობს ბუნებრივად. მასწავლებლის
        მიზანია, გასწავლოთ სიტყვებისა და გრამატიკის სწორად გამოყენება,
        თავისუფლად და გამართულად ლაპარაკი, სწრაფი საუბრის მოსმენა, ტექსტების
        მარტივად დამუშავება და გამართულად წერა.
      </p>
      <br />
      <p>
        ჩვენთან კურსებზე{" "}
        <span className="text-lingo-green font-bold">ახალი სიტყვები</span>{" "}
        სტანდარტულად არ ბარდება, არამედ პრაქტიკაში გამოყენებით მოწმდება.
        მოსწავლეები ტექსტებს კი არ ყვებიან, არამედ წაკითხვის შემდეგ განიხილავენ
        და აფასებენ ნასწავლი ლექსიკისა და გრამატიკის გამოყენებით.
      </p>
      <br />
      <p>
        კურსის{" "}
        <span className="text-lingo-green font-bold">ძირითადი მასალები</span>{" "}
        შედგება უახლესი სახელმძღვანელოებისგან, სადაც შედის აუდიოები როგორც
        ამერიკული, ასევე ბრიტანული აქცენტით; ორიგინალური ციფრული სავარჯიშოებიანი
        სასწავლო პლატფორმა, ძალიან დიდი რესურსის სასწავლო ვიდეოთეკა და გასართობი
        სამაგიდო თამაშის აქტივობებიც კი.
      </p>
      <br />
      <p>
        ძირითადის გარდა მასწავლებლები იყენებენ{" "}
        <span className="text-lingo-green font-bold">დამატებით მასალებსაც</span>
        , რომლებიც თქვენს ინტერესებსა და მიზნებზეა მორგებული, რისთვისაც გსურთ
        ინგლისურის სწავლა. ანუ დაამუშავებთ იმ რესურსებს, რომლებიც თქვენ მოგწონთ
        და გაინტერესებთ.
      </p>
      <br />
      <p>
        <span className="text-lingo-green font-bold">საშინაო დავალებები</span>{" "}
        თავიდან ბოლომდე მორგებულია ნასწავლის პრაქტიკაში გამოყენებაზე და არა
        მხოლოდ წერითი სავარჯიშოების უბრალო შესრულებაზე. “ინგლისურის კურსი
        ზრდასრულთათვის” ითვალისწინებს მოსწავლეების დატვირთულ გრაფიკსაც, ეს კი
        იმას ნიშნავს, რომ გექნებათ აი ისეთი დავალებები, ძაან მოუცლელობის დროსაც
        რომ არ დაგეზარებათ.
      </p>
      <br />
      <p>
        დიდი ყურადღება ექცევა{" "}
        <span className="text-lingo-green font-bold">
          განვლილი მასალის გამეორებასაც
        </span>
        , რისთვისაც ვატარებთ შემაჯამებელ გაკვეთილებს.
      </p>
      <br />
      <p>
        1 ინდივიდუალური/ჯგუფური კურსის ხანგრძლივობაა 4 თვე და ვასწავლით A1 - C1
        დონეებს. მოსწავლეების მინიმალური ასაკია 17.
      </p>
    </div>
  ),
  german: (
    <div style={{ fontFeatureSettings: "normal" }}>
      <p>
        გერმანული ენის კურსი ითვალისწინებს პრაქტიკულ და ინტერაქციულ მუშაობას
        მოსწავლეებთან: საუბარი, დიალოგი მიმდინარეობს ბუნებრივად. მასწავლებლის
        მიზანია, გასწავლოთ სიტყვებისა და გრამატიკის სწორად გამოყენება,
        თავისუფლად და გამართულად ლაპარაკი, სწრაფი საუბრის მოსმენა, ტექსტების
        მარტივად დამუშავება და გამართულად წერა.
      </p>
      <br />
      <p>
        ჩვენთან კურსებზე{" "}
        <span className="text-lingo-green font-bold">ახალი სიტყვები</span>{" "}
        სტანდარტულად არ ბარდება, არამედ პრაქტიკაში გამოყენებით მოწმდება.
        მოსწავლეები ტექსტებს კი არ ყვებიან, არამედ წაკითხვის შემდეგ განიხილავენ
        და აფასებენ ნასწავლი ლექსიკისა და გრამატიკის გამოყენებით.
      </p>
      <br />

      <p>
        კურსის{" "}
        <span className="text-lingo-green font-bold">ძირითადი მასალები</span>{" "}
        შედგება უახლესი სახელმძღვანელოებისგან, ძალიან დიდი რესურსის სასწავლო
        ვიდეოთეკისგან, სპეციალური სასწავლო ონლაინ პლატფორმისგან ორიგინალური
        ციფრული სავარჯიშოებითა და უახლესი ვიდეო-აუდიო მასალებით.
      </p>
      <br />

      <p>
        ძირითადის გარდა მასწავლებლები იყენებენ{" "}
        <span className="text-lingo-green font-bold">დამატებით მასალებსაც</span>
        , რომლებიც თქვენს ინტერესებსა და მიზნებზეა მორგებული, რისთვისაც გსურთ
        გერმანულის სწავლა. ანუ დაამუშავებთ იმ რესურსებს, რომლებიც თქვენ მოგწონთ
        და გაინტერესებთ.
      </p>
      <br />

      <p>
        <span className="text-lingo-green font-bold">საშინაო დავალებები</span>{" "}
        თავიდან ბოლომდე მორგებულია ნასწავლის პრაქტიკაში გამოყენებაზე და არა
        მხოლოდ წერითი სავარჯიშოების უბრალო შესრულებაზე. “გერმანულის კურსი
        ზრდასრულთათვის” ითვალისწინებს მოსწავლეების დატვირთულ გრაფიკსაც, ეს კი
        იმას ნიშნავს, რომ გექნებათ აი ისეთი დავალებები, ძაან მოუცლელობის დროსაც
        რომ არ დაგეზარებათ.{" "}
      </p>
      <br />

      <p>
        დიდი ყურადღება ექცევა{" "}
        <span className="text-lingo-green font-bold">
          განვლილი მასალის გამეორებასაც
        </span>
        , რისთვისაც ვატარებთ შემაჯამებელ გაკვეთილებს.
      </p>
      <br />

      <p>
        1 ინდივიდუალური/ჯგუფური კურსის ხანგრძლივობაა 4 თვე და ვასწავლით A1 - C1
        დონეებს. მოსწავლეების მინიმალური ასაკია 17.
      </p>
    </div>
  ),
  chinese: <></>,
};

export default function CourseDetails(props: CourseDetailsProps) {
  const [selectedItems, setSelectedItems] = useState({
    "გაკვეთილის ტიპი": "",
    "გაკვეთილის სიხშირე": "",
  });

  const { price } = useCalculatePrice(props.courseTitle, selectedItems);

  return (
    <div className="flex flex-col gap-5">
      {courseDescriptions[props.courseTitle]}
      {props.courseTitle !== "chinese" && (
        <strong className="text-lingo-green">
          კურსის ხანგრძლივობა - 4 თვე
        </strong>
      )}
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
        <strong>
          {price
            ? price +
              " ლარი " +
              (props.courseTitle === "chinese" ? "(ყოველ თვე)" : "(4 თვის)")
            : "ფასის სანახავად მონიშნეთ სასურველი ვარიანტები სამივე კატეგორიიდან"}
        </strong>
      </p>
      <section className="flex flex-col gap-2">
        <h1 className="font-bold text-lingo-green">გადახდის მეთოდები :</h1>
        <ul className="px-5 list-decimal">
          {props.courseTitle === "chinese" ? (
            <>
              <li>ყოველ თვე წინასწარ</li>
              <li>
                4 თვის ერთად წინასწარ - <strong>10%</strong> ფასდაკლება
              </li>
            </>
          ) : (
            <>
              <li>
                წინასწარ ერთიანად - <strong>10%</strong> ფასდაკლება
              </li>
              <li>ორ ნაწილად</li>
            </>
          )}
        </ul>
      </section>
    </div>
  );
}
