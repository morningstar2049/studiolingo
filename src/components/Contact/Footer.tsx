"use client";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaLinkedinIn,
} from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import InfoModal from "../InfoModal";
import SchoolRules from "../SchoolRules";

const socials = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/studiolingo",
    icon: <FaFacebookF />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/studio_lingo/",
    icon: <FaInstagram />,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@studio_lingo",
    icon: <FaYoutube />,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@studio.lingo",
    icon: <FaTiktok />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/studio-lingo/",
    icon: <FaLinkedinIn />,
  },
];

function Footer() {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isConfidentialityModalOpen, setIsConfidentialityModalOpen] =
    useState(false);
  return (
    <>
      <footer id="contact" className="mt-20 bg-lingo-black text-[#fff]">
        <div
          className="w-full h-[3px]"
          style={{
            background: "linear-gradient(90deg,#2f9e4d,#5fd07b,#2f9e4d)",
          }}
        />
        <div className="max-w-6xl px-6 py-12 mx-auto">
          <div className="flex flex-col items-center gap-10 text-center md:flex-row md:items-start md:justify-between md:text-left">
            <div className="max-w-xs">
              <div className="text-[26px] font-bold leading-none">
                <span className="text-[#fff]">studio</span>
                <span className="text-lingo-green">lingo</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#9aa5b4]">
                N1 ინგლისურის სკოლა, რომელიც გთავაზობთ ინგლისურის გაკვეთილებს
                თბილისში და ონლაინ პრაქტიკული სწავლებითა და რეიტინგული კონტენტით
              </p>
              <div className="flex justify-center gap-3 mt-5 md:justify-start">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.name}
                    className="flex items-center justify-center w-10 h-10 text-[#fff] transition-colors rounded-full bg-[#3a4356] hover:bg-lingo-green"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 md:items-start">
              <h3
                style={{ fontFeatureSettings: "'case' on" }}
                className="text-base font-bold tracking-[0.08em]"
              >
                კონტაქტი
              </h3>
              <a
                href="tel:+995322114623"
                className="flex items-center gap-2 text-sm text-[#c3c9d4] transition-colors hover:text-lingo-green"
              >
                <FiPhone className="text-lg text-lingo-green" strokeWidth={2.6} />
                +995 32 2 114 623
              </a>
              <a
                href="mailto:info@studiolingo.ge"
                className="flex items-center gap-2 text-sm text-[#c3c9d4] transition-colors hover:text-lingo-green"
              >
                <FiMail className="text-lg text-lingo-green" strokeWidth={2.6} />
                info@studiolingo.ge
              </a>
              <a
                href="https://www.google.com/maps/dir//studiolingo"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-[#c3c9d4] transition-colors hover:text-lingo-green"
              >
                <FiMapPin className="text-lg text-lingo-green" strokeWidth={2.6} />
                წერეთლის 116, თბილისი
              </a>
            </div>

            <div className="flex flex-col items-center gap-2.5 md:items-start">
              <h3
                style={{ fontFeatureSettings: "'case' on" }}
                className="mb-0.5 text-base font-bold tracking-[0.08em]"
              >
                ბმულები
              </h3>
              <button
                onClick={() => setIsConfidentialityModalOpen(true)}
                className="text-sm text-[#c3c9d4] transition-colors hover:text-lingo-green"
              >
                კონფიდენციალურობის პოლიტიკა
              </button>
              <button
                onClick={() => setIsTermsModalOpen(true)}
                className="text-sm text-[#c3c9d4] transition-colors hover:text-lingo-green"
              >
                წესები და პირობები
              </button>
              <Link
                href="/faq"
                className="text-sm text-[#c3c9d4] transition-colors hover:text-lingo-green"
              >
                ხშირი კითხვები
              </Link>
            </div>
          </div>

          <div className="pt-6 mt-10 text-sm text-center border-t border-[#ffffff14] text-[#7c8598]">
            © Studio Lingo — ყველა უფლება დაცულია
          </div>
        </div>
      </footer>
      <InfoModal
        open={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        title="წესები და პირობები"
      >
        <SchoolRules />
      </InfoModal>
      <InfoModal
        open={isConfidentialityModalOpen}
        onClose={() => setIsConfidentialityModalOpen(false)}
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
        გონივრულ ზომა, რათა ვებ-გვერდის მეშვეობით მოპოვებული ინფორმაცია
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
      </InfoModal>
    </>
  );
}

export default Footer;
