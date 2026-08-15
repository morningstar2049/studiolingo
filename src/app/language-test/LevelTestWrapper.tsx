"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaLanguage,
  FaRegListAlt,
  FaRegClock,
  FaBrain,
  FaChartBar,
  FaVolumeUp,
  FaMicrophone,
} from "react-icons/fa";
import LevelTest from "./LevelTest";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stats = [
  { Icon: FaRegListAlt, value: "48", label: "კითხვა" },
  { Icon: FaRegClock, value: "40–60წ", label: "კითხვაზე" },
  { Icon: FaBrain, value: "ადაპტიური", label: "ჩერდება დონეზე" },
  { Icon: FaChartBar, value: "A1–C1", label: "დონეები" },
];

export default function LevelTestWrapper({ levelTest }: TLevelTest) {
  const [startTest, setStartTest] = useState(false);

  if (startTest) return <LevelTest levelTest={levelTest} />;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      style={{ fontFeatureSettings: "'case' on" }}
      className="w-full max-w-[560px] my-auto rounded-[24px] bg-[#fff] border border-[#eceef2] shadow-[0_24px_54px_-22px_rgba(41,49,66,0.3)] p-7 sm:p-9 text-center"
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
        შეამოწმე შენი ინგლისურის დონე
      </motion.h1>

      <motion.p
        variants={fadeUp}
        custom={2}
        className="mt-3 text-sm sm:text-base text-[#6b7280]"
      >
        ადაპტიური ტესტი — A1-დან C1-მდე, რამდენიმე წუთში
      </motion.p>

      <motion.div
        variants={fadeUp}
        custom={3}
        className="grid grid-cols-2 gap-3 mt-7 sm:grid-cols-4"
      >
        {stats.map(({ Icon, value, label }) => (
          <div key={label} className="px-2 py-3 bg-[#f6f8f7] rounded-xl">
            <Icon className="mx-auto text-xl text-lingo-green" />
            <div className="mt-1.5 text-[17px] font-bold text-lingo-black">
              {value}
            </div>
            <div className="text-[10px] text-[#8a929d]">{label}</div>
          </div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp}
        custom={4}
        className="grid grid-cols-1 gap-3 mt-6 sm:grid-cols-2 sm:gap-4 text-[13px] text-[#6b7280]"
      >
        <span className="flex items-center justify-center gap-1.5 text-center sm:flex-col sm:gap-2">
          <FaVolumeUp className="text-base shrink-0 text-lingo-green" />
          მოსასმენი კითხვები — ჩაწერე პასუხი
        </span>
        <span className="flex items-center justify-center gap-1.5 text-center sm:flex-col sm:gap-2">
          <FaMicrophone className="text-base shrink-0 text-lingo-green" />
          ზეპირი შემოწმება მეტი სიზუსტისთვის
        </span>
      </motion.div>

      <motion.button
        variants={fadeUp}
        custom={5}
        onClick={() => setStartTest(true)}
        className="w-full py-3.5 mt-8 font-bold text-[#fff] transition-all rounded-xl bg-lingo-green shadow-lg shadow-lingo-green/25 hover:bg-[#2f904d] hover:scale-[1.02] sm:w-auto sm:px-12"
      >
        ტესტის დაწყება
      </motion.button>
    </motion.div>
  );
}
