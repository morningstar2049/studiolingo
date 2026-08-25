"use client";

import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineArrowRight } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import TermsModal from "./TermsModal";

// Native registration form that submits straight into the school's Google Form
// (englishForTeens). Responses land in the same Google Form / linked Sheet.
const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLScWvfV_Xb5WxrzScAnxtJLjPbh23kFIkywyj6TSmaHp9udZVA/formResponse";
const AGREE_ID = "entry.456632150";
const AGREE_VALUE =
  "ყურადღებით გავეცანი ყველა წესს და, როგორც მშობელი, ვეთანხმები";

type Field = {
  id: string;
  label: string;
  type: "text" | "tel" | "email" | "number" | "select";
  options?: string[];
};

const sections: { title: string; fields: Field[] }[] = [
  {
    title: "მოსწავლის მონაცემები",
    fields: [
      { id: "entry.2113546230", label: "მოსწავლის სახელი, გვარი", type: "text" },
      { id: "entry.2115745881", label: "მოსწავლის ასაკი", type: "number" },
      { id: "entry.1957136311", label: "მოსწავლის საკონტაქტო ნომერი", type: "tel" },
      { id: "entry.835886771", label: "მოსწავლის მოქმედი ელფოსტა", type: "email" },
      {
        id: "entry.501891752",
        label: "ინგლისურის (სავარაუდო) დონე",
        type: "select",
        options: [
          "ნულიდან იწყებს",
          "საბაზისო",
          "საბაზისოზე მაღალი",
          "საშუალო",
          "საშუალოზე მაღალი",
        ],
      },
    ],
  },
  {
    title: "მშობლის მონაცემები",
    fields: [
      { id: "entry.1757371366", label: "მშობლის სახელი, გვარი", type: "text" },
      { id: "entry.648000447", label: "მშობლის საკონტაქტო ნომერი", type: "tel" },
      { id: "entry.1383942736", label: "მშობლის მოქმედი ელფოსტა", type: "email" },
    ],
  },
  {
    title: "კურსი და გადახდა",
    fields: [
      {
        id: "entry.1701890631",
        label: "კურსის ტიპი",
        type: "select",
        options: [
          "ინდივიდუალური კვირაში 2 გაკვეთილი",
          "ინდივიდუალური კვირაში 3 გაკვეთილი",
          "ორმოსწავლიანი კვირაში 2 გაკვეთილი",
          "ჯგუფური -კვირაში 2 გაკვეთილი",
        ],
      },
      {
        id: "entry.1903572487",
        label: "თქვენთვის სასურველი გადახდის მეთოდი",
        type: "select",
        options: ["ერთიანად კურსის", "ბანკის უპროცენტო განვადებით"],
      },
      {
        id: "entry.438502329",
        label: "საიდან შეიტყვეთ ჩვენ შესახებ?",
        type: "select",
        options: [
          "www.studiolingo.ge",
          "Facebook",
          "Instagram",
          "Tiktok",
          "Youtube",
          "Linkedin",
          "სხვამ მირჩია",
        ],
      },
    ],
  },
];

const allFields = sections.flatMap((s) => s.fields);
const inputBase =
  "w-full px-4 py-2.5 text-[15px] rounded-xl border bg-[#fff] outline-none transition-colors";

export default function RegistrationForm({
  open = true,
  onClose,
  variant = "modal",
}: {
  open?: boolean;
  onClose?: () => void;
  // "modal" — overlay opened from a button; "page" — rendered inline on /register
  variant?: "modal" | "page";
}) {
  const isModal = variant === "modal";
  const [values, setValues] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [termsOpen, setTermsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

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

  const set = (id: string, v: string) => {
    setValues((p) => ({ ...p, [id]: v }));
    if (errors[id]) setErrors((p) => ({ ...p, [id]: false }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, boolean> = {};
    allFields.forEach((f) => {
      const v = (values[f.id] || "").trim();
      if (!v) errs[f.id] = true;
      else if (
        f.type === "email" &&
        !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)
      )
        errs[f.id] = true;
    });
    if (!agreed) errs[AGREE_ID] = true;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("submitting");
    const fd = new FormData();
    allFields.forEach((f) => fd.append(f.id, values[f.id]));
    fd.append(AGREE_ID, AGREE_VALUE);
    // The Google Form has 4 pages (student → parent → course → final). Multi-page
    // forms drop every field after the first section unless pageHistory lists all
    // pages the respondent "visited".
    fd.append("pageHistory", "0,1,2,3");
    fd.append("fvv", "1");
    try {
      await fetch(FORM_ACTION, { method: "POST", mode: "no-cors", body: fd });
    } catch {
      // no-cors: response is opaque; treat a completed request as sent
    }
    setStatus("success");
  };

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
        style={{ fontFeatureSettings: "normal" }}
        onClick={isModal ? (e) => e.stopPropagation() : undefined}
        className={`w-full max-w-lg bg-[#fff] rounded-[24px] ${
          isModal
            ? "my-6 shadow-[0_40px_80px_-24px_rgba(10,14,24,0.6)]"
            : "mx-auto border border-[#eceef2] shadow-[0_24px_54px_-26px_rgba(41,49,66,0.3)]"
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#eceef2]">
          <h2
            style={{ fontFeatureSettings: "'case' on" }}
            className="text-xl font-bold sm:text-2xl text-lingo-black"
          >
            ინგლისური მოზარდებისთვის
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
              {sections.map((section) => (
                <div key={section.title}>
                  <h3
                    style={{ fontFeatureSettings: "'case' on" }}
                    className="mb-3 text-base font-bold sm:text-lg text-lingo-green"
                  >
                    {section.title}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {section.fields.map((f) => (
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
                              f.type === "number" || f.type === "tel"
                                ? "numeric"
                                : undefined
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
                            {f.type === "email"
                              ? "შეავსეთ სწორი ელფოსტა"
                              : "ეს ველი სავალდებულოა"}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* terms agreement */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                      if (errors[AGREE_ID])
                        setErrors((p) => ({ ...p, [AGREE_ID]: false }));
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
                {errors[AGREE_ID] && (
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
      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
    </>
  );
}
