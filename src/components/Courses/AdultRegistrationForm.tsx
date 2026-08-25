"use client";

import { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineArrowRight } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import InfoModal from "../InfoModal";
import SchoolRules from "../SchoolRules";

// Native registration form for the adult English courses. Submits straight into
// the school's Google Form ("ინგლისურის კურსები ზრდასრულთათვის"), which branches
// on online vs. onsite lessons — replicated here so responses land identically.
const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfyXSZCZCGhCAHQV4Zn1AAuJxeb4Yll3Acs8EwkndGDmQTAZA/formResponse";
const AGREE_VALUE = "ყურადღებით გავეცანი ყველა წესს და ვეთანხმები";

// Branch values (must match the Google Form option text exactly).
const ONLINE = "ონლაინ გაკვეთილები";
const ONSITE = "ფიზიკური/საოფისე გაკვეთილები";

// Entry ids that are submitted implicitly (not shown as their own UI field).
const AGREE_ID_FINAL = "entry.940638417"; // terms, always sent
const AGREE_ID_ONLINE = "entry.161711356"; // terms, online branch only
const LESSON_TYPE_ID = "entry.1846302127";

type Field = {
  id: string;
  label: string;
  type: "text" | "tel" | "email" | "number" | "select";
  options?: string[];
};

const commonFields: Field[] = [
  { id: "entry.2005620554", label: "სახელი, გვარი", type: "text" },
  { id: "entry.1611228309", label: "ასაკი", type: "number" },
  { id: "entry.1469338775", label: "საკონტაქტო ნომერი", type: "tel" },
  { id: "entry.129933980", label: "WhatsApp / Viber ნომერი", type: "tel" },
  { id: "entry.1324604824", label: "პირადობის ID ნომერი", type: "text" },
  { id: "entry.1297167939", label: "მოქმედი ელფოსტა", type: "email" },
  {
    id: "entry.1796271592",
    label: "ინგლისურის დონე, რომელსაც ფლობთ",
    type: "select",
    options: [
      "ნულიდან ვიწყებ",
      "საბაზისო",
      "საბაზისოზე მაღალი",
      "საშუალო",
      "საშუალოზე მაღალი",
      "მაღალი",
    ],
  },
  {
    id: LESSON_TYPE_ID,
    label: "გაკვეთილის ტიპი",
    type: "select",
    options: [ONLINE, ONSITE],
  },
];

const onlineFields: Field[] = [
  {
    id: "entry.1063444576",
    label: "რომელი ტიპის კურსი გსურთ?",
    type: "select",
    options: [
      "ზოგადი ინგლისური",
      "სასაუბრო ინგლისური",
      "ბიზნეს ინგლისური",
      "IELTS",
    ],
  },
  {
    id: "entry.2130961897",
    label: "კურსის ფორმატი",
    type: "select",
    options: [
      "ინდივიდუალური კვირაში 2 გაკვეთილი",
      "ინდივიდუალური კვირაში 3 გაკვეთილი",
      "ჯგუფური კვირაში 2 გაკვეთილი",
      "ორმოსწავლიანი კვირაში 2 გაკვეთილი",
    ],
  },
];

const onsiteFields: Field[] = [
  {
    id: "entry.1111271813",
    label: "რომელი ტიპის კურსი გსურთ?",
    type: "select",
    options: ["ზოგადი და სასაუბრო ინგლისური - 3 თვე"],
  },
];

const finalFields: Field[] = [
  {
    id: "entry.1561845878",
    label: "თქვენთვის სასურველი გადახდის მეთოდი",
    type: "select",
    options: ["ერთიანად გადმორიცხვით", "ბანკის უპროცენტო განვადებით"],
  },
  {
    id: "entry.55605018",
    label: "რისთვის გსურთ ინგლისურის სწავლა?",
    type: "text",
  },
  {
    id: "entry.200136865",
    label: "საიდან შეიტყვეთ სტუდიო ლინგოზე?",
    type: "select",
    options: [
      "www.studiolingo.ge",
      "Facebook",
      "Instagram",
      "Tiktok",
      "Youtube",
      "Linkedin",
      "Studio Lingo-დან დამიკავშირდნენ",
      "სხვამ მირჩია",
    ],
  },
];

const inputBase =
  "w-full px-4 py-2.5 text-[15px] rounded-xl border bg-[#fff] outline-none transition-colors";

export default function AdultRegistrationForm({
  open = true,
  onClose,
  variant = "modal",
}: {
  open?: boolean;
  onClose?: () => void;
  // "modal" — overlay opened from a button; "page" — inline on /register/adults
  variant?: "modal" | "page";
}) {
  const isModal = variant === "modal";
  const cardRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [termsOpen, setTermsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const lessonType = values[LESSON_TYPE_ID] || "";
  const isOnline = lessonType === ONLINE;
  const isOnsite = lessonType === ONSITE;
  const courseFields = isOnline ? onlineFields : isOnsite ? onsiteFields : [];

  useEffect(() => {
    if (!isModal || !open) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && onClose && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isModal, open, onClose]);

  if (isModal && !open) return null;

  // Bring the confirmation into view (see the teens form for the full rationale):
  // scroll the window to the very top on the page, or align the card in the modal,
  // with the global smooth behavior temporarily disabled so it's an instant jump.
  const scrollToTop = () => {
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    if (isModal) cardRef.current?.scrollIntoView({ block: "start" });
    else window.scrollTo({ top: 0 });
    root.style.scrollBehavior = prev;
  };

  const set = (id: string, v: string) => {
    setValues((p) => ({ ...p, [id]: v }));
    if (errors[id]) setErrors((p) => ({ ...p, [id]: false }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeFields = [...commonFields, ...courseFields, ...finalFields];
    const errs: Record<string, boolean> = {};
    activeFields.forEach((f) => {
      const v = (values[f.id] || "").trim();
      if (!v) errs[f.id] = true;
      else if (f.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v))
        errs[f.id] = true;
    });
    if (!agreed) errs.agree = true;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("submitting");
    const fd = new FormData();
    activeFields.forEach((f) => fd.append(f.id, values[f.id]));
    // Terms confirmation and the branch-specific pageHistory. Google multi-page
    // forms only keep fields on pages listed in pageHistory; the adult form
    // branches, so online visits pages 0,1,3,4 and onsite visits 0,2,3,4.
    fd.append(AGREE_ID_FINAL, AGREE_VALUE);
    if (isOnline) {
      fd.append(AGREE_ID_ONLINE, AGREE_VALUE);
      fd.append("pageHistory", "0,1,3,4");
    } else {
      fd.append("pageHistory", "0,2,3,4");
    }
    fd.append("fvv", "1");
    try {
      await fetch(FORM_ACTION, { method: "POST", mode: "no-cors", body: fd });
    } catch {
      // no-cors: response is opaque; treat a completed request as sent
    }
    scrollToTop();
    setStatus("success");
  };

  const renderField = (f: Field) => (
    <div key={f.id}>
      <label className="block mb-2 text-[14px] font-bold sm:text-base text-lingo-black">
        {f.label}
      </label>
      {f.type === "select" ? (
        <select
          value={values[f.id] || ""}
          onChange={(e) => set(f.id, e.target.value)}
          className={`${inputBase} ${
            errors[f.id]
              ? "border-[#e24b4a]"
              : "border-[#e3e7ec] focus:border-lingo-green"
          }`}
        >
          <option value="" disabled>
            აირჩიეთ…
          </option>
          {f.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={f.type === "number" ? "text" : f.type}
          inputMode={
            f.type === "number" || f.type === "tel" ? "numeric" : undefined
          }
          value={values[f.id] || ""}
          onChange={(e) => set(f.id, e.target.value)}
          className={`${inputBase} ${
            errors[f.id]
              ? "border-[#e24b4a]"
              : "border-[#e3e7ec] focus:border-lingo-green"
          }`}
        />
      )}
      {errors[f.id] && (
        <p className="mt-1 text-[13px] sm:text-sm text-[#e24b4a]">
          {f.type === "email" ? "შეავსეთ სწორი ელფოსტა" : "ეს ველი სავალდებულოა"}
        </p>
      )}
    </div>
  );

  return (
    <>
      <div
        className={
          isModal
            ? "fixed inset-0 z-[100] flex items-start justify-center p-4 overflow-y-auto bg-[#0d1322cc] backdrop-blur-sm"
            : ""
        }
        onClick={isModal && onClose ? onClose : undefined}
      >
        <div
          ref={cardRef}
          style={{ fontFeatureSettings: "normal" }}
          onClick={isModal ? (e) => e.stopPropagation() : undefined}
          className={`w-full max-w-lg bg-[#fff] rounded-[24px] ${
            isModal
              ? "my-6 shadow-[0_40px_80px_-24px_rgba(10,14,24,0.6)]"
              : "mx-auto border border-[#eceef2] shadow-[0_24px_54px_-26px_rgba(41,49,66,0.3)]"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#eceef2]">
            <h2
              style={{ fontFeatureSettings: "'case' on" }}
              className="text-xl font-bold sm:text-2xl text-lingo-black"
            >
              ინგლისური ზრდასრულთათვის
            </h2>
            {isModal && (
              <button
                type="button"
                onClick={onClose}
                aria-label="დახურვა"
                className="flex items-center justify-center w-9 h-9 rounded-full text-[#6b7280] hover:bg-[#f2f4f7]"
              >
                <AiOutlineClose />
              </button>
            )}
          </div>

          {status === "success" ? (
            <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
              <span className="flex items-center justify-center w-16 h-16 text-2xl rounded-full bg-lingo-green/10 text-lingo-green">
                <FaCheck />
              </span>
              <h3 className="text-xl font-bold sm:text-2xl text-lingo-black">
                მადლობა რეგისტრაციისთვის!
              </h3>
              <p className="text-base sm:text-lg text-[#5f6b74] max-w-sm">
                თქვენი განაცხადი მიღებულია — ჩვენ მალევე დაგიკავშირდებით.
              </p>
              {isModal ? (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-7 py-3 mt-2 text-[15px] font-bold rounded-xl text-[#fff] bg-lingo-green hover:bg-[#2b904a]"
                >
                  დახურვა
                </button>
              ) : (
                <a
                  href="/courses"
                  className="px-7 py-3 mt-2 text-[15px] font-bold rounded-xl text-[#fff] bg-lingo-green hover:bg-[#2b904a]"
                >
                  კურსებზე დაბრუნება
                </a>
              )}
            </div>
          ) : (
            <form onSubmit={submit} className="px-6 py-6">
              <div className="flex flex-col gap-7">
                <div>
                  <h3
                    style={{ fontFeatureSettings: "'case' on" }}
                    className="mb-3 text-base font-bold sm:text-lg text-lingo-green"
                  >
                    მოსწავლის მონაცემები
                  </h3>
                  <div className="flex flex-col gap-4">
                    {commonFields.map(renderField)}
                  </div>
                </div>

                {courseFields.length > 0 && (
                  <div>
                    <h3
                      style={{ fontFeatureSettings: "'case' on" }}
                      className="mb-3 text-base font-bold sm:text-lg text-lingo-green"
                    >
                      კურსი
                    </h3>
                    <div className="flex flex-col gap-4">
                      {courseFields.map(renderField)}
                    </div>
                  </div>
                )}

                <div>
                  <h3
                    style={{ fontFeatureSettings: "'case' on" }}
                    className="mb-3 text-base font-bold sm:text-lg text-lingo-green"
                  >
                    გადახდა და დამატებითი
                  </h3>
                  <div className="flex flex-col gap-4">
                    {finalFields.map(renderField)}
                  </div>
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => {
                        setAgreed(e.target.checked);
                        if (errors.agree)
                          setErrors((p) => ({ ...p, agree: false }));
                      }}
                      className="mt-1 w-5 h-5 sm:w-6 sm:h-6 accent-lingo-green shrink-0"
                    />
                    <span className="text-[15px] sm:text-lg leading-relaxed text-[#3f4a52]">
                      ვეთანხმები საიტზე განთავსებულ{" "}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setTermsOpen(true);
                        }}
                        className="font-bold underline text-lingo-green"
                      >
                        წესებსა და პირობებს
                      </button>
                      .
                    </span>
                  </label>
                  {errors.agree && (
                    <p className="mt-1 text-[13px] sm:text-sm text-[#e24b4a]">
                      გთხოვთ, დაეთანხმოთ წესებსა და პირობებს
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center w-full gap-2 px-6 py-4 text-base sm:text-lg font-bold rounded-xl text-[#fff] bg-lingo-green shadow-[0_16px_36px_-14px_rgba(47,158,77,0.7)] transition-all hover:bg-[#2b904a] disabled:opacity-60"
                >
                  {status === "submitting" ? "იგზავნება…" : "გაგზავნა"}
                  {status !== "submitting" && (
                    <AiOutlineArrowRight className="shrink-0" />
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <InfoModal
        open={termsOpen}
        onClose={() => setTermsOpen(false)}
        title="წესები და პირობები"
      >
        <SchoolRules />
      </InfoModal>
    </>
  );
}
