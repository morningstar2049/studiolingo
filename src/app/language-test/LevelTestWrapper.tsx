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
import UserInfoForm from "./UserInfoForm";
import { scrollToTop } from "./scrollToTop";
import type { LevelTestTexts } from "./levelTestTexts";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Tile icons by position; the tile texts come from the texts.
const statIcons = [FaRegListAlt, FaRegClock, FaBrain, FaChartBar];

export default function LevelTestWrapper({
  levelTest,
  texts,
}: TLevelTest & { texts: LevelTestTexts }) {
  const stats = texts.intro.stats.slice(0, 4).map((stat, i) => ({
    ...stat,
    Icon: statIcons[i],
  }));
  const [userInfo, setUserInfo] = useState<TUserInfo | null>(null);
  const [startTest, setStartTest] = useState(false);

  // Step 1: collect the visitor's details before anything else.
  if (!userInfo)
    return (
      <UserInfoForm
        texts={texts}
        onSubmit={(info) => {
          scrollToTop();
          setUserInfo(info);
        }}
      />
    );

  // Step 3: the test itself, once they've read the intro card.
  if (startTest)
    return (
      <LevelTest
        levelTest={levelTest}
        texts={texts}
        userInfo={userInfo}
      />
    );

  return (
    <motion.div
      initial="hidden"
      animate="show"
      style={{ fontFeatureSettings: "'case' on" }}
      className="w-full max-w-[560px] my-auto rounded-[24px] bg-[#fff] border border-[#eceef2] shadow-[0_24px_54px_-24px_rgba(47,158,77,0.45)] p-7 sm:p-9 text-center"
    >
      <motion.span
        variants={fadeUp}
        custom={0}
        className="inline-flex items-center gap-2 rounded-full bg-lingo-green/10 px-4 py-1.5 text-xs font-bold text-lingo-green sm:text-sm"
      >
        <FaLanguage className="text-base" />
        {texts.badge}
      </motion.span>

      <motion.h1
        variants={fadeUp}
        custom={1}
        className="mt-5 text-2xl font-bold sm:text-3xl text-lingo-black"
      >
        {texts.intro.headline}
      </motion.h1>

      <motion.p
        variants={fadeUp}
        custom={2}
        className="mt-3 text-sm sm:text-base text-[#6b7280]"
      >
        {texts.intro.subtitle}
      </motion.p>

      <motion.div
        variants={fadeUp}
        custom={3}
        className="grid grid-cols-2 gap-3 mt-7 sm:grid-cols-4"
      >
        {stats.map(({ Icon, value, label }, i) => (
          <div key={i} className="px-2 py-3 bg-[#f6f8f7] rounded-xl sm:px-1.5">
            <Icon className="mx-auto text-xl text-lingo-green" />
            <div className="mt-1.5 text-[17px] leading-tight font-bold text-lingo-black sm:text-[15px] sm:tracking-tight">
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
        <span className="flex items-center justify-center gap-2 text-center sm:flex-col">
          <FaVolumeUp className="text-base shrink-0 text-lingo-green" />
          {texts.intro.listeningNote}
        </span>
        <span className="flex items-center justify-center gap-2 text-center sm:flex-col">
          <FaMicrophone className="text-base shrink-0 text-lingo-green" />
          {texts.intro.speakingNote}
        </span>
      </motion.div>

      <motion.button
        variants={fadeUp}
        custom={5}
        onClick={() => {
          scrollToTop();
          setStartTest(true);
        }}
        className="w-full py-3.5 mt-8 font-bold text-[#fff] transition-all rounded-xl bg-lingo-green shadow-lg shadow-lingo-green/25 hover:bg-[#2f904d] hover:scale-[1.02] sm:w-auto sm:px-12"
      >
        {texts.intro.startButton}
      </motion.button>
    </motion.div>
  );
}
