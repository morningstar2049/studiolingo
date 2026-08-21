import CourseSubhead from "./CourseSubhead";

// "ხელსაწყოები" — breaks down the AI-powered learning tools. Shared across all
// course descriptions.
export default function CourseToolsSection() {
  return (
    <>
      <CourseSubhead>ხელსაწყოები</CourseSubhead>
      <p>
        სტუდიო ლინგო პირველი სკოლაა, რომელმაც ინგლისურის სწავლებაში{" "}
        <span className="font-bold text-lingo-green">
          ხელოვნური ინტელექტის
        </span>{" "}
        გამოყენება ჯერ კიდევ 2024 წელს დაიწყო. კურსზე გამოიყენებ ყველაზე ეფექტურ
        სასწავლო AI ხელსაწყოებს — გამოთქმის ვარჯიშიდან და ლექსიკის დამახსოვრებიდან
        დაწყებული, პერსონალური, მყისიერი უკუკავშირით დამთავრებული. ტექნოლოგიის
        განვითარებასთან ერთად ჩვენი ხელსაწყოების არსენალიც მუდმივად ახლდება, რომ
        ინგლისურის სწავლა მაქსიმალურად მარტივი და ეფექტური გახდეს.
      </p>
    </>
  );
}
