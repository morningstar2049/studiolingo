"use client";

import { useState } from "react";

export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

interface SessionSetupProps {
  onStart: (level: Level, topic: string) => void;
  isLoading: boolean;
}

// `value` stays as the CEFR code (A1–C2) the API and speech logic rely on;
// `label` is only what the user sees on the pre-chat level picker.
const LEVELS: { value: Level; label: string }[] = [
  { value: "A1", label: "Beginner" },
  { value: "A2", label: "Elementary" },
  { value: "B1", label: "Intermediate" },
  { value: "B2", label: "Upper Intermediate" },
  { value: "C1", label: "Advanced" },
  { value: "C2", label: "Proficient" },
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="260 293 272 275" width="56" height="57" aria-label="Studio Lingo">
            <defs><style>{`.sl1{fill:#2f9e4d}.sl2{fill:#293142}`}</style></defs>
            <g>
              <path className="sl2" d="M397.16,296.26c-74.33,0-134.8,60.47-134.8,134.8v134.8h134.8c74.33,0,134.79-60.47,134.79-134.8s-60.47-134.8-134.79-134.8Zm0,248.9h-114.1v-114.1c0-62.91,51.19-114.1,114.1-114.1s114.1,51.19,114.1,114.1-51.18,114.1-114.1,114.1Z"/>
              <path className="sl1" d="M354.89,377.75c-14.2-.11-14.21,21.95,0,22.06,19.53,.15,38.14,7.7,51.98,21.53s21.38,32.46,21.53,51.98c.11,14.19,22.17,14.22,22.06,0-.19-25.22-10.11-49.7-27.99-67.58-17.88-17.88-42.35-27.8-67.58-27.99Z"/>
              <path className="sl1" d="M354.89,410.14c-14.2-.17-14.21,21.89,0,22.06,22.72,.27,40.84,18.43,41.12,41.12,.17,14.19,22.23,14.22,22.06,0-.42-34.69-28.49-62.76-63.18-63.18Z"/>
              <path className="sl1" d="M354.89,444.56c-5.77-.16-11.29,5.18-11.03,11.03,.27,6.11,4.85,10.86,11.03,11.03,.4,.01,.63,0,.77-.02,.04,.01,.06,.02,.1,.03,.22,.06,1.47,.47,1.73,.5,.51,.3,1.01,.63,1.55,.88-1.69-.78-.11-.12,.58,.57,.36,.36,1.11,1.57,1.03,1.4,.19,.32,.38,.64,.55,.97,.06,.21,.17,.62,.26,1.04,.06,.28,.1,.48,.14,.65-.01,.1-.02,.3,0,.68,.16,5.76,4.96,11.3,11.03,11.03,5.84-.26,11.2-4.85,11.03-11.03-.43-15.94-12.82-28.33-28.76-28.76Z"/>
            </g>
          </svg>
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
          Studio{" "}
          <span style={{ color: C.green }}>Lingo</span>{" "}
          Chat
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
              // minmax(0,1fr) forces three exactly-equal columns. Plain "1fr"
              // has a min-content floor, so on narrow screens (e.g. iPhone SE)
              // a long word like "Intermediate" would widen its column and throw
              // the whole grid out of alignment.
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
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
                    padding: "8px",
                    // Equal height for every button so a 2-line label like
                    // "Upper Intermediate" doesn't make its row taller than the
                    // single-line rows (kept the grid asymmetric on iPhone).
                    minHeight: 54,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                      fontSize: 13,
                      lineHeight: 1.15,
                      overflowWrap: "break-word",
                      ...(sel ? W : { color: C.textPrimary }),
                    }}
                  >
                    {lvl.label}
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
