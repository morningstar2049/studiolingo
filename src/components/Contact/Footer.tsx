"use client";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import ImageWrapper from "../ImageWrapper";
import { useState } from "react";
import Modal from "../Modal";

function Footer() {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isConfidentialityModalOpen, setIsConfidentialityModalOpen] =
    useState(false);
  return (
    <>
      <footer
        id="contact"
        className="bg-lingo-black mt-20 grid grid-flow-row md:grid-flow-col place-items-center text-[#fff] text-base md:text-lg py-5 h-[300px] lg:h-[240px]"
      >
        <div className="flex flex-col items-center gap-5">
          {/* <p
            className="font-bold cursor-pointer"
            onClick={() => setIsTermsModalOpen(true)}
          >
            წესები და პირობები
          </p> */}
          <p
            className="font-bold cursor-pointer"
            onClick={() => setIsConfidentialityModalOpen(true)}
          >
            კონფიდენციალურობის პოლიტიკა
          </p>
        </div>
        <ImageWrapper
          alt="logo-white"
          src="/lingo-logo-white.png"
          fill={true}
          objectFit="contain"
          extraStyles="hidden sm:block sm:h-[200px] sm:w-[200px]"
        />
        <div className="flex flex-col justify-center h-full gap-4">
          <div className="flex gap-2">
            <AiOutlinePhone className="text-[20px] md:text-[22px]" />
            <p className="text-[#fff]">+995 32 2 114 623</p>
          </div>
          <div className="flex gap-2">
            <AiOutlineMail className="text-[20px] md:text-[22px]" />
            <p className="text-[#fff]">info@studiolingo.ge</p>
          </div>
        </div>
        <p>© Studio Lingo - ყველა უფლება დაცულია</p>
      </footer>
      <Modal
        open={isTermsModalOpen}
        setOpen={setIsTermsModalOpen}
        title="წესები და პირობები"
      >
        <p>
          <strong>1.</strong> თითო კურსი გრძელდება 4 თვე. კურსებზე თანხის
          გადახდა შესაძლებელია 2 გზით:
          <br />
          <br />
          <p>
            <span className="font-bold underline">- ორ ნაწილად გადახდით</span> -
            სწავლის დაწყებამდე იხდით მთლიანი კურსის ტარიფის ნახევარს და ერთი
            თვის შემდეგ მეორე ნახევარს.
          </p>
          <br />
          <p>
            <span className="font-bold underline">- ერთიანად გადახდით</span> -
            იხდით მთლიანი კურსის თანხას წინასწარ ერთიანად და სარგებლობთ 10%-იანი
            ფასდაკლებით.
          </p>
          <br />
          <p>
            ფორმის შევსებიდან მაქსიმუმ 3 დღეში ხორციელდება თანხის გადახდა.
            წინააღმდეგ შემთხვევაში, ავტომატურად გაუქმდება თქვენი რეგისტრაცია.
            გადახდილი თანხა დაბრუნებას ექვემდებარება მხოლოდ გრაფიკის
            შეუთანხმებლობის შემთხვევაში კურსის დაწყებამდე.
          </p>
        </p>
        <p>
          <strong>2.</strong> ჯგუფური კურსის არჩევის შემთხვევაში თუკი თანხა
          წინასწარ გადახდილი გაქვთ და თქვენმა ჯგუფელმა ვერ შეძლო თქვენთან ერთად
          დაწყება, შემდგომ გიტარდებათ იმავე რაოდენობის ინდივიდუალური გაკვეთილები
          1 სთ-მდე ხანგრძლივობით. თუკი კურსის შუაში გამოეთიშა თქვენი ჯგუფელი
          კურსს, პაუზის გარეშე აგრძელებთ 1 სთ-მდე ხანგრძლივობის გაკვეთილებს
          ინდივიდუალურად.
        </p>
        <p>
          <strong>3.</strong>{" "}
          <span className="font-bold underline">ჯგუფური კურსის არჩევისას</span>{" "}
          უმეტესწილად თქვენი ჯგუფელი იქნება სხვა დონეზე, რადგან ზუსტად ერთნაირი
          დონის მოსწავლეები ნაკლებად არიან (ათვისების სისწრაფე ისედაც ყოველთვის
          განსხვავებულია). ასეთ რეჟიმშიც კი თქვენ არც ერთ წამს არ კარგავთ
          გაკვეთილზე, რადგან მასწავლებლის რეგულირებით, სანამ ის მეორე
          მოსწავლესთან მუშაობს, იქამდე თქვენ მის მოცემულ დავალებებს ასრულებთ და
          შემდეგ ასე მონაცვლეობით. თქვენთვის რაიმე პრობლემის არსებობის
          შემთხვევაში ალტერნატივად გთავაზობთ ინდივიდუალურ რეჟიმზე გადასვლას.
        </p>
        <p>
          <strong>4.</strong> თქვენი მიზეზით გაცდენილ გაკვეთილებში ჩვეულებრივ
          იხდით თანხას, ხოლო მასწავლებლის მიზეზით გაცდენილში თანხას არ იხდით.
          გაკვეთილის გაცდენის შემთხვევაში მასწავლებელი აუცილებლად უნდა იყოს
          წინასწარ გაფრთხილებული.
        </p>
        <p>
          <strong>5.</strong> აღდგენას ექვემდებარება მხოლოდ მასწავლებლის მიერ
          გაცდენილი გაკვეთილები.
        </p>
        <p>
          <strong>6.</strong> კურსის გრაფიკი უნდა იყოს ფიქსირებული
          ადმინისტრატორთან შეთანხმებული და არა ცვლადი.
        </p>
        <p>
          <strong>7.</strong> Studio Lingo-ს წარმომადგენელი პერიოდულად
          ახორციელებს გაკვეთილების ვიდეო მონიტორინგს ხარისხის გაუმჯობესების
          მიზნით.
        </p>
        <p>
          <strong>8.</strong> ჩვენი სკოლა მუშაობს ყოველდღე. სკოლაში ოფიციალური
          დასვენებებია: ახალი წელი (30.12 - 07.01); აღდგომა (შაბათი, კვირა,
          ორშაბათი) და აგვისტოს თვე. Სხვა დღეებში ჩვეულ რეჟიმში მუშაობს სკოლა.
        </p>
        <p>
          <strong>9.</strong> გამონაკლის შემთხვევებში კურსის განმავლობაში
          გათვალისწინებულია მასწავლებლის ცვლილებაც.
        </p>
        <p>
          <strong>10.</strong> ფორმის შევსებით თქვენ აცხადებთ თანხმობას
          საინფორმაციო მეილების (შემოთავაზებები, ფასდაკლებები, სიახლეები)
          მიღებაზე და მისი გაუქმება ნებისმიერ დროს მარტივად შეგიძლიათ.
        </p>
      </Modal>
      <Modal
        open={isConfidentialityModalOpen}
        setOpen={setIsConfidentialityModalOpen}
        title="კონფიდენციალურობის პოლიტიკა"
      >
        მოცემული კონფიდენციალურობის დაცვის პოლიტიკა განმარტავს თუ როგორ და რა
        მიზნებისათვის ხდება მომხმარებელთა პერსონალური ინფორმაციია შეგროვება,
        დამუშავება და დაცვა. ჩვენი კომპანიისთვის უმნიშვნელოვანესია თქვენი
        პერსონალური ინფორმაციის უსაფრთხოება, რომელსაც გვიზიარებთ
        www.studiolingo.ge ვებგვერდის საშუალებით.
        <p className="font-bold">ინფორმაციის შეგროვება</p>
        ჩვენ ვაგროვებთ პერსონალურ ინფორმაციას, როდესაც ჩვენს კურსებზე
        რეგისტრირდებით. რეგისტაციის პროცესში აუცილებელია მოგვაწოდოთ გარკვეული
        სახის პირადი ინფორმაცია, მაგ: თქვენი სახელი, გვარი, ელექტრონული ფოსტა,
        ტელეფონის ნომერი, ენის სწავლის მიზნები.
        <p className="font-bold">ინფორმაციის დაცვა</p>
        ჩვენ ვიცავთ პერსონალურ მონაცემებს, რომლებსაც გვანდობთ. ჩვენ ვიღებთ ყველა
        გონივრულ ზომას, რათა ვებ-გვერდის მეშვეობით მოპოვებული ინფორმაცია
        დამუშავდეს დაცულად წინამდებარე კონფიდენციალურობის დაცვის პოლიტიკისა და
        მონაცემთა დაცვის სტანდარტების შესაბამისად. ყველა სახის პირადი
        ინფორმაციის მოპოვება ხდება მხოლოდ თქვენი თანხმობის საფუძველზე.
        ვებ-გვერდზე არსებული გადახდის სისტემა სრულიად უსაფრთხოა. როდესაც თქვენ
        ჩვენს ვებ-გვერდზე ახორციელებთ კურსების შეძენას, ამ დროს თქვენი ბარათის
        ინფორმაცია ჩვენთვის არ არის ხელმისაწვდომი, შესაბამისად ამ მონაცემების
        შენახვა ჩვენს მიერ არ ხდება.
        <p className="font-bold">ინფორმაციის დამუშავება</p>
        პერსონალური მონაცემების დამუშავების მთავარი მიზანია ჩვენზე დაკისრებული
        მოვალეობის ეფექტურად და ჯეროვნად შესრულება. გარდა ამისა მონაცემების
        დამუშავება გვეხმარება სწრაფი და ხარისხიანი მომსახურების გაწევაში, ახალი
        პროდუქტებისა და სერვისების დანერგვაში, მარკეტინგული აქტივობების
        განხორციელებაში, თქვენს პრეტენზიებსა და შენიშვნებზე რეაგირებაში, ჩვენი
        ვებ-გვერდის და ზოგადად სისტემის არასათანადო გამოყენებისა და დანაშაულის
        პრევენციაში როგორც ჩვენი, ასევე თქვენი კანონიერი ინტერესების დაცვაში.
        თქვენი პერსონალური მონაცემების გადაცემა შეიძლება დაგვჭირდეს საქართველოს
        კანონმდებლობით განსაზღვრულ შემთხვევებში, ასეთი შეთხვევა შეიძლება იყოს
        კანონით განსაზღვრულ შემთხვევებში ინფორმაციაზე სამართალდამცავი
        ორგანოებისათვის წვდომის დაშვება.
        <p className="font-bold">
          ცვლილებები კონფიდენციალურობის დაცვის პოლიტიკაში
        </p>
        ჩვენ ვიტოვებთ უფლებას, ნებისმიერ დროს შევცვალოთ წინამდებარე ინფორმაციის
        დაცვის პოლიტიკა. ინფორმაციის დაცვის პოლიტიკაში განხორციელებული
        ნებისმიერი ცვლილება დაუყოვნებლივ გამოქვეყნდება ინფორმაციის დაცვის
        გვერდზე
      </Modal>
    </>
  );
}

export default Footer;
