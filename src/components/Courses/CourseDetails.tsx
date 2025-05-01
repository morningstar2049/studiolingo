"use client";
import { useState } from "react";
import useCalculatePrice from "@/hooks/useCalculatePrice";
import CourseRadioInput from "./CourseRadioInput";
import Button from "../Button";

type CourseDetailsProps = {
  courseTitle: "english" | "german" | "englishForTeens";
};

const courseUrls: { [key in CourseDetailsProps["courseTitle"]]: string } = {
  english:
    "https://docs.google.com/forms/d/e/1FAIpQLSfyXSZCZCGhCAHQV4Zn1AAuJxeb4Yll3Acs8EwkndGDmQTAZA/viewform?fbclid=IwAR1OVyQbCE_wBL2xDTIMfwI30o03Oc1eCdhRBSlvwEF6u4N48O2bzV88YAw",
  german:
    "https://docs.google.com/forms/d/e/1FAIpQLSfyXSZCZCGhCAHQV4Zn1AAuJxeb4Yll3Acs8EwkndGDmQTAZA/viewform?fbclid=IwAR1OVyQbCE_wBL2xDTIMfwI30o03Oc1eCdhRBSlvwEF6u4N48O2bzV88YAw",
  englishForTeens:
    "https://docs.google.com/forms/d/e/1FAIpQLScWvfV_Xb5WxrzScAnxtJLjPbh23kFIkywyj6TSmaHp9udZVA/viewform",
};

const courseDescriptions: {
  english: JSX.Element;
  german: JSX.Element;
  englishForTeens: JSX.Element;
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
        კურსის ხანგრძლივობა ინდივიდუალურია, ხოლო მინიმალური პერიოდია 4 თვე და
        ვასწავლით A1-C1 დონეებს. მოსწავლეების მინიმალური ასაკია 17.
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
        კურსის ხანგრძლივობა ინდივიდუალურია, ხოლო მინიმალური პერიოდია 4 თვე და
        ვასწავლით A1-C1 დონეებს. მოსწავლეების მინიმალური ასაკია 17.
      </p>
    </div>
  ),
  englishForTeens: (
    <div style={{ fontFeatureSettings: "normal" }}>
      <p>
        ინგლისური ენის კურსი ითვალისწინებს პრაქტიკულ და ინტერაქციულ მუშაობას
        სკოლის მოსწავლეებთან ჯგუფურად - მასწავლებელი მუდმივად კონცენტრირდება
        გრამატიკულ წესებზე, მდიდარი ლექსიკის შესწავლასა და მათ სწორ
        გამოყენებაზე.
      </p>
      <br />
      <p>
        გაკვეთილები ტარდება ინტერაქტიული და შემოქმედებითი{" "}
        <span className="text-lingo-green font-bold">მიდგომებით</span> ,რაც
        მოზარდებისთვის მოტივაციის ზრდას და ნასწავლის პრაქტიკაში გამოყენებას
        უზრუნველყოფს.
      </p>
      <br />
      <p>
        კურსის განმავლობაში მოსწავლეები გამოიყენებენ{" "}
        <span className="text-lingo-green font-bold">
          სუპერ თანამედროვე მასალებს
        </span>{" "}
        ,რომლებიც მოიცავს სკოლის მოსწავლეებისთვის განკუთვნილ წიგნებს დონეების
        მიხედვით; აუდიო და ვიდეო მასალებს; სასწავლო ონლაინ პლატფორმას, რომელსაც
        მასწავლებელთან ერთად გამოიყენებენ; სპეციალურ ვიდეო თამაშებს ინგლისური
        ენის გასაუმჯობესებლად.
      </p>
      <br />
      <p>
        რაც მთავარია, ჩვენი მასალების{" "}
        <span className="text-lingo-green font-bold">სავარჯიშოები</span>{" "}
        განკუთვნილია როლური თამაშების, დისკუსიებისა და ჯგუფური პროექტებისთვისაც.
        ანუ, თქვენ გექნებათ გარანტია, რომ თქვენი შილი მაქსიმალურად იქნება
        ჩართული ამა თუ იმ განმავითარებელ ინგლისურენოვან აქტივობაში.
      </p>
      <br />
      <p>
        დიდი ყურადღება ექცევა{" "}
        <span className="text-lingo-green font-bold">
          განვლილი მასალის გამეორება
        </span>
        საც, რისთვისაც ვატარებთ შემაჯამებელ გაკვეთილებს.
      </p>
      <br />
      <p>
        ამასთან, კურსი ქმნის მოსწავლეებისთვის მეგობრულ, მხარდაჭერილ და, რაც
        მთავარია, სწავლის მიმართ მომთხოვნ{" "}
        <span className="text-lingo-green font-bold">გარემოს</span>, სადაც ისინი
        შეძლებენ ენის სწავლის პროცესში წინსვლასა და საკუთარი თავის განვითარებას.
      </p>
      <br />
      <p>
        სწავლის პერიოდი ინდივიდუალურია, ვასწავლით დონეებს სრულიად ნულიდან
        მოწინავე დონის ჩათვლით (A1-B2). კურსი განკუთვნილია{" "}
        <span className="text-lingo-green font-bold">
          10-დან 16 წლამდე მოზარდები
        </span>
        სთვის
      </p>
    </div>
  ),
};

export default function CourseDetails(props: CourseDetailsProps) {
  const [selectedItems, setSelectedItems] = useState({
    "გაკვეთილის ტიპი": "",
    "გაკვეთილის სიხშირე": "კვირაში 2-ჯერ",
  });

  const { price } = useCalculatePrice(props.courseTitle, selectedItems);

  return (
    <div className="flex flex-col gap-5">
      {courseDescriptions[props.courseTitle]}
      {props.courseTitle !== "englishForTeens" && (
        <strong className="text-lingo-green">
          სწავლის მინიმალური პერიოდი - 3 თვე
        </strong>
      )}
      <strong className="text-lingo-black">
        გაკვეთილის ხანგრძლივობა -{" "}
        {selectedItems["გაკვეთილის ტიპი"] === "ინდივიდუალური"
          ? "1 სთ"
          : "1 სთ 30 წთ"}
      </strong>
      {props.courseTitle === "englishForTeens" && (
        <strong className="text-lingo-black">ჯგუფში 3 ან 4 მოსწავლე</strong>
      )}
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
          choices={["კვირაში 2-ჯერ"]}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </section>
      <p>
        <strong>
          {price
            ? price + " ლარი " + `(3 თვის)`
            : "ფასის სანახავად მონიშნეთ სასურველი ვარიანტები მოცემული კატეგორიებიდან"}
        </strong>
      </p>
      <section className="flex flex-col gap-2">
        <h1 className="font-bold text-lingo-green">გადახდის მეთოდები :</h1>
        <ul className="px-5 list-decimal">
          {props.courseTitle !== "englishForTeens" ? (
            <>
              <li>3 თვის წინასწარ ერთიანად</li>
            </>
          ) : (
            <>
              <li>3 თვის წინასწარ ერთიანად</li>
            </>
          )}
        </ul>
      </section>
      <a href={courseUrls[props.courseTitle]} target="_blank">
        <Button extraStyles="w-full lg:w-[50%]">შემოგვიერთდი</Button>
      </a>
    </div>
  );
}
