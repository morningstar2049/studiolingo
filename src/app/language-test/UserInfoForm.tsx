"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaLanguage } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function UserInfoForm({
  onSubmit,
}: {
  onSubmit: (info: TUserInfo) => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [contactMe, setContactMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!firstName.trim()) next.firstName = "შეავსეთ სახელი";
    if (!lastName.trim()) next.lastName = "შეავსეთ გვარი";
    if (!email.trim()) next.email = "შეავსეთ ელ. ფოსტა";
    else if (!isValidEmail(email.trim())) next.email = "არასწორი ელ. ფოსტა";
    if (!phone.trim()) next.phone = "შეავსეთ ტელეფონის ნომერი";
    if (!age.trim()) next.age = "შეავსეთ ასაკი";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    onSubmit({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      age: age.trim(),
      contactMe,
    });
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 text-base text-left border rounded-xl outline-none transition-colors appearance-none focus:border-lingo-green ${
      errors[field] ? "border-[#e24b4a]" : "border-[#eceef2]"
    }`;

  return (
    <motion.form
      initial="hidden"
      animate="show"
      onSubmit={handleSubmit}
      style={{ fontFeatureSettings: "'case' on" }}
      className="w-full max-w-[520px] my-auto rounded-[24px] bg-[#fff] border border-[#eceef2] shadow-[0_24px_54px_-22px_rgba(41,49,66,0.3)] p-7 sm:p-9 text-center"
    >
      <motion.span
        variants={fadeUp}
        custom={0}
        className="inline-flex items-center gap-2 rounded-full bg-lingo-green/10 px-4 py-1.5 text-xs font-bold text-lingo-green sm:text-sm"
      >
        <FaLanguage className="text-base" />
        ინგლისურის დონის ტესტი
      </motion.span>

      <motion.h1
        variants={fadeUp}
        custom={1}
        className="mt-5 text-2xl font-bold sm:text-3xl text-lingo-black"
      >
        დაიწყე ტესტი
      </motion.h1>

      <motion.p
        variants={fadeUp}
        custom={2}
        className="mt-3 text-sm sm:text-base text-[#6b7280]"
      >
        შეავსე მონაცემები, რომ დავიწყოთ და შედეგი მიიღო
      </motion.p>

      <motion.div variants={fadeUp} custom={3} className="mt-7 space-y-3.5">
        <div className="text-left">
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="სახელი"
            aria-label="სახელი"
            className={inputClass("firstName")}
          />
          {errors.firstName && (
            <p className="mt-1 text-[12px] text-[#e24b4a]">{errors.firstName}</p>
          )}
        </div>
        <div className="text-left">
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="გვარი"
            aria-label="გვარი"
            className={inputClass("lastName")}
          />
          {errors.lastName && (
            <p className="mt-1 text-[12px] text-[#e24b4a]">{errors.lastName}</p>
          )}
        </div>
        <div className="text-left">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ელ. ფოსტა"
            aria-label="ელ. ფოსტა"
            className={inputClass("email")}
          />
          {errors.email && (
            <p className="mt-1 text-[12px] text-[#e24b4a]">{errors.email}</p>
          )}
        </div>
        <div className="text-left">
          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="ტელეფონის ნომერი"
            aria-label="ტელეფონის ნომერი"
            className={inputClass("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-[12px] text-[#e24b4a]">{errors.phone}</p>
          )}
        </div>
        <div className="text-left">
          <input
            inputMode="numeric"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="ასაკი"
            aria-label="ასაკი"
            className={inputClass("age")}
          />
          {errors.age && (
            <p className="mt-1 text-[12px] text-[#e24b4a]">{errors.age}</p>
          )}
        </div>
        <label className="flex items-start gap-2.5 text-left cursor-pointer">
          <input
            type="checkbox"
            checked={contactMe}
            onChange={(e) => setContactMe(e.target.checked)}
            className="mt-0.5 w-5 h-5 accent-lingo-green shrink-0"
          />
          <span className="text-[13px] leading-relaxed text-[#4b5563]">
            დამიკავშირდით და გამაცანით კურსები
          </span>
        </label>
      </motion.div>

      <motion.button
        variants={fadeUp}
        custom={4}
        type="submit"
        className="w-full py-3.5 mt-7 font-bold text-[#fff] transition-all rounded-xl bg-lingo-green shadow-lg shadow-lingo-green/25 hover:bg-[#2f904d] hover:scale-[1.02]"
      >
        გაგრძელება →
      </motion.button>

      <motion.p
        variants={fadeUp}
        custom={5}
        className="mt-4 text-[11px] leading-relaxed text-[#9aa2ad]"
      >
        მონაცემები გამოიყენება მხოლოდ ტესტის შედეგის გამოსაგზავნად და თქვენთან
        დასაკავშირებლად.
      </motion.p>
    </motion.form>
  );
}
