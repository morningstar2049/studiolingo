"use client";

import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

// Studio Lingo course rules & conditions, shown from the registration form.
export default function TermsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-start justify-center p-4 overflow-y-auto bg-[#0d1322cc] backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        style={{ fontFeatureSettings: "normal" }}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col w-full max-w-2xl overflow-hidden bg-[#fff] rounded-[24px] max-h-[calc(100dvh-2rem)] shadow-[0_40px_80px_-24px_rgba(10,14,24,0.6)]"
      >
        <div className="flex items-center justify-between px-6 py-5 bg-[#fff] border-b border-[#eceef2] shrink-0">
          <h2
            style={{ fontFeatureSettings: "'case' on" }}
            className="text-lg font-bold sm:text-xl text-lingo-black"
          >
            წესები და პირობები
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="დახურვა"
            className="flex items-center justify-center w-9 h-9 rounded-full text-[#6b7280] hover:bg-[#f2f4f7]"
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="flex flex-col flex-1 min-h-0 gap-5 px-6 py-6 overflow-y-auto text-[15px] leading-relaxed text-[#3f4a52]">
          <div>
            <p>
              <strong className="text-lingo-black">1.</strong> კურსების შეძენა
              ხდება ორი გზით:
            </p>
            <ol className="flex flex-col gap-1.5 pl-6 mt-2 list-decimal">
              <li>
                ერთიანად გადახდით - კურსის დაწყებამდე მოსწავლესთან გასაუბრებისა და
                გრაფიკის შეთანხმების შემდეგ მოსწავლე იხდის კურსის მთლიან საფასურს
                ერთიანად.
              </li>
              <li>
                ბანკის უპროცენტო განვადებით - კურსის დაწყებამდე მოსწავლესთან
                გასაუბრებისა და გრაფიკის შეთანხმების შემდეგ მოსწავლე იხდის ბანკის
                ნაწილ-ნაწილ გადახდით, რომლითაც შეუძლია კურსის საფასურის გადახდა 4
                ნაწილად ყოველ თვე.
              </li>
            </ol>
            <p className="mt-4">კურსის თანხის დაბრუნება ხდება 3 გზით:</p>
            <ol className="flex flex-col gap-1.5 pl-6 mt-2 list-decimal">
              <li>
                გრაფიკის შეთანხმდებამდე გადახდის შემთხვევაში, თუკი ჩვენი სკოლა
                მოსწავლეს ვერ სთავაზობს მოსწავლისთვის მისაღებ გრაფიკს.
              </li>
              <li>
                ჯგუფური გაკვეთილების შემთხვევაში, თუკი თანხის გადახდიდან 2 კვირის
                განმავლობაში ჯგუფი ვერ შედგება და მოსწავლეს არ სურს 2 კვირაზე მეტი
                ლოდინი. მოსწავლის მოთხოვნისამებრ, კომპანია მოსწავლეს უბრუნებს
                გადახდილ თანხას.
              </li>
              <li>
                უპროცენტო განვადების შემთხვევაში გადახდის შეთანხმების გაფორმებიდან
                14 კალენდარული დღის განმავლობაში საქართველოს კანონმდებლობის
                შესაბამისად.
              </li>
            </ol>
            <p className="mt-3">
              სხვა შემთხვევებში გადახდილი თანხა დაბრუნებას არ ექვემდებარება.
              ნებისმიერი უკმაყოფილების შემთხვევაში სკოლის ადმინისტრაცია და ხარისხის
              შეფასების ჯგუფი მოსწავლესთან გაივლის კონსულტაციას და შესთავაზებს
              ყველა შესაძლო ალტერნატივას.
            </p>
          </div>

          <p>
            <strong className="text-lingo-black">2.</strong> ჯგუფში მაქსიმუმ 4
            მოსწავლეა.
          </p>

          <div>
            <p>
              <strong className="text-lingo-black">3.</strong> მოსწავლის მიზეზით
              გაცდენილი ნებისმიერი გაკვეთილი ჩატარებულად ითვლება და ჩვეულებრივ
              იხდით თანხას, ხოლო მასწავლებლის მიზეზით გაცდენილში თანხას არ იხდით.
            </p>
            <p className="mt-2">
              დაგვიანებების შემთხვევაში მასწავლებელი წინასწარ უნდა იყოს
              გაფრთხილებული. გაუფრთხილებლობის შემთხვევაში გაკვეთილის დაწყებიდან 5
              წუთის შემდეგ მასწავლებელი შეეცდება მოსწავლესთან/მშობელთან დარეკვას.
              თუკი მოსწავლე ან/და მშობელი ზარს არ/ვერ უპასუხებს, გაკვეთილის დროიდან
              15 წუთის შემდეგ მასწავლებელს აქვს უფლება, გაცდენილად ჩათვალოს
              გაკვეთილი და არ დაელოდოს მოსწავლეს.
            </p>
          </div>

          <div>
            <p>
              <strong className="text-lingo-black">4.</strong> აღდგენას
              ექვემდებარება მხოლოდ მასწავლებლის მიზეზით გაცდენილი გაკვეთილები.
            </p>
            <p className="mt-2">
              ოფიციალურ უქმე დღეებზე კი სკოლა ისვენებს და გაკვეთილები ითვლება
              ჩატარებულად.
            </p>
          </div>

          <p>
            <strong className="text-lingo-black">5.</strong> გაკვეთილების გრაფიკი
            მორგებულია ჯგუფთან, სადაც მინიმუმ 3 მოსწავლეა. მე-4 მოსწავლედ დამატების
            შემთხვევაში მოსწავლე ერგება უკვე დადგენილ გრაფიკს.
          </p>

          <div>
            <p>
              <strong className="text-lingo-black">6.</strong> Studio Lingo-ს
              მასწავლებელი პერიოდულად ახორციელებს გაკვეთილების მონიტორინგს
              უშუალოდ დასწრებით ან გაკვეთილის ჩაწერის ფორმით ხარისხის გაუმჯობესების
              მიზნით.
            </p>
            <p className="mt-2">
              ჩანაწერები არის კომპანიის საკუთრება, რომელსაც კომპანია მხოლოდ ხარისხის
              გაუმჯობესების მიზნით იყენებს. მოგვიანებით ყველა ჩანაწერი ნადგურდება,
              შესაბამისად, ყველას უფლება დაცულია. იხილეთ ჩვენი კონფიდენციალურობის
              პოლიტიკა ჩვენს ვებგვერდზე.
            </p>
          </div>

          <p>
            <strong className="text-lingo-black">7.</strong> მშობელს ნებისმიერ
            მომენტში შეუძლია დაესწროს ონლაინ გაკვეთილებს ხელის შეშლისა და მოსწავლის
            ყურადღების გაფანტვის გარეშე.
          </p>

          <p>
            <strong className="text-lingo-black">8.</strong> თვეში მოსწავლის ყოველი
            მესამე დაფიქსირებული გაცდენისას მშობელთან ხორციელდება ზარი მისი
            ინფორმირების მიზნით.
          </p>

          <p>
            <strong className="text-lingo-black">9.</strong> ყოველი თვის ბოლოს
            მშობელს ელფოსტაზე ეგზავნება რეპორტი, რომელიც მოიცავს თვის შეჯამებას
            მოსწავლის სასწავლო პროგრესისა და გაცდენების კუთხით.
          </p>

          <p>
            <strong className="text-lingo-black">10.</strong> ჩვენი სკოლა მუშაობს
            ყოველდღე კვირა დღის გარდა. სკოლაში დასვენებებია ყველა ოფიციალური
            სახელმწიფო დასვენების დღე და ამ დღეების გაკვეთილები ითვლება
            ჩატარებულად.
          </p>

          <div>
            <p>
              <strong className="text-lingo-black">11.</strong> კურსის განმავლობაში
              სემესტრულად გათვალისწინებულია მასწავლებლის ცვლილებაც. ყველა ჩვენთან
              დასაქმებული მასწავლებელი აკმაყოფილებს ჩვენი სკოლის სტანდარტებსა და
              კვალიფიკაციას.
            </p>
            <p className="mt-2">
              მოსწავლისგან სკოლას ეძლევა გაკვეთილების დაპაუზების მაქსიმუმ 2 კვირის
              ვადა მასწავლებლის ცვლილების შემთხვევაში.
            </p>
            <p className="mt-2">
              სკოლას ეძლევა გაკვეთილების დაპაუზების ვადა მასწავლებლის შვებულების
              შემთხვევაში შრომითი კოდექსით გათვალისწინებული ნორმის ფარგლებში.
            </p>
          </div>

          <div>
            <p>
              <strong className="text-lingo-black">12.</strong> მოსწავლე
              ვალდებულია, ონლაინ გაკვეთილებს დაესწროს ჩართული კამერით, რაც
              აუცილებელია გაკვეთილის ეფექტურად ჩასატარებლად. კამერის გამორთვა
              დასაშვებია იშვიათ გამონაკლისებში, რომლებზეც მოსწავლე მასწავლებლისგან
              იღებს თანხმობას. სისტემატიურად გამორთული კამერით გაკვეთილებზე დასწრება
              დაუშვებელია.
            </p>
            <p className="mt-2">
              ხმაურიანი გარემოსა ან იმ ნებისმიერი ვითარების შემთხვევაში, რომელიც
              აფერხებს და ხელს უშლის მასწავლებელს გაკვეთილის ჩატარებაში, მოსწავლე
              ვალდებულია, მიიღოს ყველანაირი ზომა, რომ არ შეუშალოს ხელი გაკვეთილის
              მსვლელობას.
            </p>
          </div>

          <div>
            <p>
              <strong className="text-lingo-black">13.</strong> ფორმის შევსებით
              თქვენ აცხადებთ თანხმობას საინფორმაციო მეილების (შემოთავაზებები,
              ფასდაკლებები, სიახლეები) მიღებაზე და მისი გაუქმება ნებისმიერ დროს
              მარტივად შეგიძლიათ.
            </p>
            <p className="mt-2">
              წესები პერიოდულად ექვემდებარება განახლებას, რომლის შესახებ თქვენ
              წინასწარ მეილით იქნებით ინფორმირებულნი.
            </p>
          </div>
        </div>

        <div className="px-6 py-4 bg-[#fff] border-t border-[#eceef2] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 text-[15px] font-bold rounded-xl text-[#fff] bg-lingo-green hover:bg-[#2b904a]"
          >
            დახურვა
          </button>
        </div>
      </div>
    </div>
  );
}
