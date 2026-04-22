"use client";

import { useState } from "react";
import Image from "next/image";

export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

interface SessionSetupProps {
  onStart: (level: Level, topic: string) => void;
  isLoading: boolean;
}

const LEVELS: { value: Level; label: string; desc: string }[] = [
  { value: "A1", label: "A1", desc: "Beginner" },
  { value: "A2", label: "A2", desc: "Elementary" },
  { value: "B1", label: "B1", desc: "Intermediate" },
  { value: "B2", label: "B2", desc: "Upper-Int." },
  { value: "C1", label: "C1", desc: "Advanced" },
  { value: "C2", label: "C2", desc: "Proficient" },
];

export default function SessionSetup({
  onStart,
  isLoading,
}: SessionSetupProps) {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [topic, setTopic] = useState("");
  const [error, setError] = useState("");

  const handleStart = () => {
    if (!selectedLevel) {
      setError("Please select your English level.");
      return;
    }
    if (!topic.trim()) {
      setError('Please enter a topic or type "general".');
      return;
    }
    setError("");
    onStart(selectedLevel, topic.trim());
  };

  const whiteText = { color: "#ffffff" } as const;

  return (
    // fixed inset-0 so this fills the whole viewport and covers the studiolingo.ge
    // main-site navigation (logo + hamburger) that would otherwise sit above the chat.
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto"
      style={{
        height: "100dvh",
        background: "linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)",
      }}
    >
      <div
        className="w-full max-w-md p-8 my-auto"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          boxShadow:
            "0 20px 60px rgba(41,49,66,0.08), 0 4px 20px rgba(41,49,66,0.04), 0 0 0 1px rgba(41,49,66,0.03)",
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <Image
            src="/images/lingo-main.png"
            alt="Studio Lingo"
            width={150}
            height={46}
            className="object-contain"
            priority
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Title */}
        <h1
          className="text-[22px] font-bold text-center mb-1"
          style={{ color: "#293142", letterSpacing: "-0.02em" }}
        >
          English Practice Chat
        </h1>
        <p
          className="text-center text-[14px] mb-8"
          style={{ color: "#6b7280" }}
        >
          Chat with an AI native English speaker
        </p>

        {/* Level Selection */}
        <div className="mb-6">
          <label
            className="block text-[13px] font-semibold mb-3"
            style={{ color: "#293142", letterSpacing: "-0.01em" }}
          >
            What is your English level?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {LEVELS.map((lvl) => {
              const isSelected = selectedLevel === lvl.value;
              return (
                <button
                  key={lvl.value}
                  onClick={() => setSelectedLevel(lvl.value)}
                  disabled={isLoading}
                  className="py-3 px-2 text-center transition-all duration-200 active:scale-95 disabled:cursor-not-allowed"
                  style={{
                    borderRadius: "14px",
                    border: "1.5px solid",
                    borderColor: isSelected ? "#2f9e4d" : "rgba(41,49,66,0.08)",
                    background: isSelected
                      ? "linear-gradient(135deg, #2f9e4d 0%, #267a3d 100%)"
                      : "#ffffff",
                    boxShadow: isSelected
                      ? "0 4px 14px rgba(47,158,77,0.3)"
                      : "0 1px 2px rgba(41,49,66,0.03)",
                  }}
                >
                  <div
                    className="font-bold text-[15px]"
                    style={isSelected ? whiteText : { color: "#293142" }}
                  >
                    {lvl.label}
                  </div>
                  <div
                    className="text-[10.5px] mt-0.5 font-medium"
                    style={
                      isSelected
                        ? { color: "rgba(255,255,255,0.85)" }
                        : { color: "#9ca3af" }
                    }
                  >
                    {lvl.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Topic Input */}
        <div className="mb-5">
          <label
            className="block text-[13px] font-semibold mb-2"
            style={{ color: "#293142", letterSpacing: "-0.01em" }}
          >
            What would you like to practice?
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isLoading && handleStart()}
            placeholder="e.g. Travel, Work, Food, Technology..."
            disabled={isLoading}
            className="w-full px-4 py-3 transition-all disabled:opacity-50 text-[16px]"
            style={{
              borderRadius: "14px",
              border: "1.5px solid rgba(41,49,66,0.1)",
              backgroundColor: "#ffffff",
              color: "#293142",
              outline: "none",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#2f9e4d";
              e.currentTarget.style.boxShadow =
                "0 0 0 4px rgba(47,158,77,0.12)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(41,49,66,0.1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <p className="text-[11.5px] mt-2" style={{ color: "#9ca3af" }}>
            💡 Type a specific topic, or just write{" "}
            <span className="font-semibold" style={{ color: "#2f9e4d" }}>
              &quot;general&quot;
            </span>{" "}
            for a variety of topics
          </p>
        </div>

        {/* Error */}
        {error && (
          <p
            className="text-[13px] mb-4 text-center font-medium animate-in fade-in slide-in-from-top-1 duration-200"
            style={{ color: "#ef4444" }}
          >
            {error}
          </p>
        )}

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={isLoading}
          className="w-full py-4 font-bold text-[15px] transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{
            ...whiteText,
            borderRadius: "14px",
            background: "linear-gradient(135deg, #2f9e4d 0%, #267a3d 100%)",
            boxShadow: "0 4px 16px rgba(47,158,77,0.35)",
            letterSpacing: "-0.01em",
          }}
        >
          {isLoading ? (
            <>
              <div
                className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
                style={{
                  borderColor: "#ffffff",
                  borderTopColor: "transparent",
                }}
              />
              <span style={whiteText}>Starting your session...</span>
            </>
          ) : (
            <span style={whiteText}>Start Chatting →</span>
          )}
        </button>
      </div>
    </div>
  );
}
