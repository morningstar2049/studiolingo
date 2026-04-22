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

const C = {
  green: "#2f9e4d",
  greenDark: "#267a3d",
  blue: "#293142",
  white: "#ffffff",
  textPrimary: "#293142",
  textMuted: "#6b7280",
  border: "rgba(41,49,66,0.1)",
} as const;

const W: React.CSSProperties = { color: C.white };

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

  // Rendered by ChatInterface via createPortal — already positioned in document.body
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483647,
        height: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        overflowY: "auto",
        background: "linear-gradient(180deg,#f9fafb 0%,#f3f4f6 100%)",
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 440,
          margin: "auto",
          background: C.white,
          borderRadius: 24,
          padding: 32,
          boxShadow:
            "0 20px 60px rgba(41,49,66,0.08), 0 4px 20px rgba(41,49,66,0.04), 0 0 0 1px rgba(41,49,66,0.03)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Image
            src="/images/lingo-main.png"
            alt="Studio Lingo"
            width={150}
            height={46}
            style={{ objectFit: "contain" }}
            priority
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Title */}
        <h1
          style={{
            color: C.textPrimary,
            fontSize: 22,
            fontWeight: 700,
            textAlign: "center",
            margin: "0 0 4px",
            letterSpacing: "-0.02em",
          }}
        >
          English Practice Chat
        </h1>
        <p
          style={{
            color: C.textMuted,
            fontSize: 14,
            textAlign: "center",
            margin: "0 0 28px",
          }}
        >
          Chat with an AI native English speaker
        </p>

        {/* Level grid */}
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: "block",
              color: C.textPrimary,
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 10,
              letterSpacing: "-0.01em",
            }}
          >
            What is your English level?
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 8,
            }}
          >
            {LEVELS.map((lvl) => {
              const sel = selectedLevel === lvl.value;
              return (
                <button
                  key={lvl.value}
                  onClick={() => setSelectedLevel(lvl.value)}
                  disabled={isLoading}
                  style={{
                    cursor: isLoading ? "not-allowed" : "pointer",
                    border: `1.5px solid ${sel ? C.green : C.border}`,
                    borderRadius: 14,
                    padding: "10px 8px",
                    textAlign: "center",
                    background: sel
                      ? `linear-gradient(135deg,${C.green},${C.greenDark})`
                      : C.white,
                    boxShadow: sel
                      ? "0 4px 12px rgba(47,158,77,0.28)"
                      : "0 1px 2px rgba(41,49,66,0.03)",
                    transition: "all 0.18s",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      ...(sel ? W : { color: C.textPrimary }),
                    }}
                  >
                    {lvl.label}
                  </div>
                  <div
                    style={{
                      fontSize: 10.5,
                      marginTop: 2,
                      fontWeight: 500,
                      color: sel ? "rgba(255,255,255,0.82)" : C.textMuted,
                    }}
                  >
                    {lvl.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Topic input */}
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: "block",
              color: C.textPrimary,
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 8,
              letterSpacing: "-0.01em",
            }}
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
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px 16px",
              fontSize: 16,
              border: `1.5px solid ${C.border}`,
              borderRadius: 14,
              background: C.white,
              color: C.textPrimary,
              outline: "none",
              opacity: isLoading ? 0.5 : 1,
              transition: "border-color 0.15s, box-shadow 0.15s",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = C.green;
              e.currentTarget.style.boxShadow =
                "0 0 0 4px rgba(47,158,77,0.12)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = C.border;
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <p style={{ color: C.textMuted, fontSize: 11.5, margin: "6px 0 0" }}>
            💡 Type a specific topic, or write{" "}
            <span style={{ fontWeight: 600, color: C.green }}>
              &quot;general&quot;
            </span>{" "}
            for a variety of topics
          </p>
        </div>

        {/* Error */}
        {error && (
          <p
            style={{
              color: "#ef4444",
              fontSize: 13,
              fontWeight: 500,
              textAlign: "center",
              margin: "0 0 12px",
            }}
          >
            {error}
          </p>
        )}

        {/* Start button */}
        <button
          onClick={handleStart}
          disabled={isLoading}
          style={{
            ...W,
            width: "100%",
            padding: "14px 0",
            fontSize: 15,
            fontWeight: 700,
            border: "none",
            borderRadius: 14,
            cursor: isLoading ? "not-allowed" : "pointer",
            background: `linear-gradient(135deg,${C.green},${C.greenDark})`,
            boxShadow: "0 4px 16px rgba(47,158,77,0.35)",
            opacity: isLoading ? 0.6 : 1,
            transition: "opacity 0.15s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            letterSpacing: "-0.01em",
          }}
        >
          {isLoading ? (
            <>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: `2px solid ${C.white}`,
                  borderTopColor: "transparent",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              <span style={W}>Starting your session...</span>
            </>
          ) : (
            <span style={W}>Start Chatting →</span>
          )}
        </button>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
