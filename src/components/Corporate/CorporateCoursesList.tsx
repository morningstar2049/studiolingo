import Button from "../Button";
import Link from "next/link";

function CorporateCoursesList() {
  return (
    <div className="flex flex-col gap-10 p-4">
      <p
        className="font-bold text-lingo-green text-lg"
        // style={{ fontFeatureSettings: "'case' on" }}
      >
        ჩვენი კორპორაციული გაკვეთილებია:
      </p>
      <ul className="list-disc ml-5">
        <li>
          <strong className="text-lingo-green">ბიზნეს ინგლისური</strong> -
          ფინანსები და ბუღალტერია, მარკეტინგი, ადამიანური რესურსები(HR), ბიზნეს
          სამართალი, ლოჯისტიკა.
        </li>
        <li>
          <strong className="text-lingo-green">
            ზოგადი/სასაუბრო ინგლისური
          </strong>
        </li>
        <li>
          <strong className="text-lingo-green">ზოგადი/სასაუბრო რუსული</strong>
        </li>
      </ul>

      <p
        className="font-bold text-lingo-black text-lg"
        // style={{ fontFeatureSettings: "'case' on" }}
      >
        ჩვენი გუნდი თქვენს თანამშრომლებს დაეხმარება, რომ მათ უცხო ენაზე
        ეფექტურად და გამართულად შეძლონ:
      </p>
      <ul className="list-disc ml-5">
        <li>საუბარი</li>
        <li>პრეზენტაციების ჩატარება</li>
        <li>წერილობითი მოხსენებების შექმნა</li>
        <li>ოფიციალური მეილების და წერილების გაგზავნა</li>
        <li>ეფექტური საქმიანი კომუნიკაცია უცხოენოვან პარტნიორებთან</li>
        <li>ოფიციალური შეხვედრებისა და მოლაპარაკებების წარმართვა</li>
      </ul>

      <Link href="/register">
        <Button extraStyles="w-full sm:w-1/3">რეგისტრაცია</Button>
      </Link>
    </div>
  );
}

export default CorporateCoursesList;
