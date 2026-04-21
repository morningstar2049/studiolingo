"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import SessionSetup, { type Level } from "./SessionSetup";

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  hidden?: boolean;
  // Assistant message extras
  translation?: string;
  isTranslating?: boolean;
  showTranslation?: boolean;
  // User message extras
  correction?: string;
  isCheckingGrammar?: boolean;
  showCorrection?: boolean;
};

type Session = {
  level: Level;
  topic: string;
};

const generateId = () => Math.random().toString(36).substring(2, 9);

// ─────────────────────────────────────────
// Icons (inline SVG to avoid extra deps)
// ─────────────────────────────────────────

const IconVolume = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3 h-3"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
  </svg>
);

const IconStop = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3 h-3"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const IconMic = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
  </svg>
);

const IconStopSquare = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M6 6h12v12H6z" />
  </svg>
);

const IconSend = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const IconRefresh = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
  </svg>
);

// ─────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────

export default function ChatInterface() {
  const [session, setSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Pre-load TTS voices on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  // Helper: update one message's fields
  const updateMessage = useCallback((id: string, updates: Partial<Message>) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    );
  }, []);

  // ─────────────────────────────────────────
  // Text-to-Speech
  // ─────────────────────────────────────────

  // Strip emojis and special symbols so TTS doesn't read them aloud
  const stripEmojisForSpeech = (text: string): string =>
    text
      .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "")
      .replace(/[\u2600-\u27BF]/g, "")
      .replace(/[\uFE00-\uFE0F]/g, "")
      .replace(/\u200D/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const speakMessage = useCallback((text: string, messageId: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    setPlayingMessageId(messageId);

    const cleanText = stripEmojisForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "en-US";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find(
        (v) =>
          v.lang === "en-US" &&
          v.name.toLowerCase().includes("google us english"),
      ) ||
      voices.find(
        (v) => v.lang === "en-US" && v.name.toLowerCase().includes("google"),
      ) ||
      voices.find((v) => v.name.toLowerCase() === "samantha") ||
      voices.find((v) => v.name.toLowerCase() === "alex") ||
      voices.find((v) => v.lang === "en-US") ||
      voices.find((v) => v.lang.startsWith("en"));
    if (preferred) utterance.voice = preferred;

    utterance.onend = () => setPlayingMessageId(null);
    utterance.onerror = () => setPlayingMessageId(null);

    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingMessageId(null);
  }, []);

  // ─────────────────────────────────────────
  // Session Start
  // ─────────────────────────────────────────

  const handleStartSession = useCallback(
    async (level: Level, topic: string) => {
      setIsStarting(true);
      const newSession: Session = { level, topic };

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: "Hello!" }],
            level,
            topic,
            isFirstMessage: true,
          }),
        });

        if (!res.ok) throw new Error("API error");
        const data = await res.json();

        const hiddenHello: Message = {
          id: generateId(),
          role: "user",
          content: "Hello!",
          hidden: true,
        };
        const welcomeMsg: Message = {
          id: generateId(),
          role: "assistant",
          content: data.message,
        };

        setSession(newSession);
        setMessages([hiddenHello, welcomeMsg]);
        setTimeout(() => speakMessage(data.message, welcomeMsg.id), 250);
      } catch {
        const topicLabel =
          topic.toLowerCase() === "general"
            ? "all sorts of interesting things"
            : topic;
        const fallbackMsg: Message = {
          id: generateId(),
          role: "assistant",
          content: `Hi there! 👋 I'm Alex, your English practice partner! I'm really excited to chat with you today. We're going to talk about ${topicLabel}! To kick things off — what do you already know about this topic?`,
        };
        setSession(newSession);
        setMessages([
          { id: generateId(), role: "user", content: "Hello!", hidden: true },
          fallbackMsg,
        ]);
        setTimeout(
          () => speakMessage(fallbackMsg.content, fallbackMsg.id),
          250,
        );
      } finally {
        setIsStarting(false);
      }
    },
    [speakMessage],
  );

  // ─────────────────────────────────────────
  // Send Message
  // ─────────────────────────────────────────

  const sendMessage = useCallback(
    async (
      userText: string,
      currentMessages: Message[],
      sessionData: Session,
    ) => {
      if (!userText.trim() || isLoading) return;

      const userMsg: Message = {
        id: generateId(),
        role: "user",
        content: userText.trim(),
      };

      const newMessages = [...currentMessages, userMsg];
      setMessages(newMessages);
      setInput("");
      setIsLoading(true);

      try {
        const apiMessages = newMessages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: apiMessages,
            level: sessionData.level,
            topic: sessionData.topic,
            isFirstMessage: false,
          }),
        });

        if (!res.ok) throw new Error("API error");
        const data = await res.json();

        const botMsg: Message = {
          id: generateId(),
          role: "assistant",
          content: data.message,
        };

        setMessages((prev) => [...prev, botMsg]);
        setTimeout(() => speakMessage(data.message, botMsg.id), 100);
      } catch {
        const errMsg: Message = {
          id: generateId(),
          role: "assistant",
          content:
            "I'm sorry, I had a connection issue. Could you try sending your message again?",
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, speakMessage],
  );

  const handleSend = useCallback(() => {
    if (!session || !input.trim() || isLoading) return;
    sendMessage(input, messages, session);
  }, [session, input, isLoading, messages, sendMessage]);

  // ─────────────────────────────────────────
  // Voice Input
  // ─────────────────────────────────────────

  const handleVoiceInput = useCallback(() => {
    const SpeechAPI =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechAPI) {
      alert(
        "Voice input is not supported in your browser. Please use Chrome or Safari.",
      );
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const recognition = new SpeechAPI();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);

    recognition.onresult = (event: any) => {
      const transcript: string = event.results[0][0].transcript;
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      inputRef.current?.focus();
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognition.start();
  }, [isRecording]);

  // ─────────────────────────────────────────
  // Translation
  // ─────────────────────────────────────────

  const handleTranslate = useCallback(
    async (messageId: string, text: string) => {
      const msg = messages.find((m) => m.id === messageId);
      if (!msg) return;

      if (msg.showTranslation) {
        updateMessage(messageId, { showTranslation: false });
        return;
      }
      if (msg.translation) {
        updateMessage(messageId, { showTranslation: true });
        return;
      }

      updateMessage(messageId, { isTranslating: true, showTranslation: true });

      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        const data = await res.json();
        updateMessage(messageId, {
          translation: data.translation || "Translation failed.",
          isTranslating: false,
        });
      } catch {
        updateMessage(messageId, {
          translation: "Translation failed. Please try again.",
          isTranslating: false,
        });
      }
    },
    [messages, updateMessage],
  );

  // ─────────────────────────────────────────
  // Grammar Check
  // ─────────────────────────────────────────

  const handleGrammarCheck = useCallback(
    async (messageId: string, text: string) => {
      const msg = messages.find((m) => m.id === messageId);
      if (!msg) return;

      if (msg.showCorrection) {
        updateMessage(messageId, { showCorrection: false });
        return;
      }
      if (msg.correction) {
        updateMessage(messageId, { showCorrection: true });
        return;
      }

      updateMessage(messageId, {
        isCheckingGrammar: true,
        showCorrection: true,
      });

      try {
        const res = await fetch("/api/grammar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        const data = await res.json();
        updateMessage(messageId, {
          correction: data.corrected || "Grammar check failed.",
          isCheckingGrammar: false,
        });
      } catch {
        updateMessage(messageId, {
          correction: "Grammar check failed. Please try again.",
          isCheckingGrammar: false,
        });
      }
    },
    [messages, updateMessage],
  );

  // ─────────────────────────────────────────
  // New Session
  // ─────────────────────────────────────────

  const handleNewSession = useCallback(() => {
    stopSpeaking();
    recognitionRef.current?.stop();
    setSession(null);
    setMessages([]);
    setInput("");
    setIsLoading(false);
    setIsRecording(false);
  }, [stopSpeaking]);

  // ─────────────────────────────────────────
  // Render: Setup Screen
  // ─────────────────────────────────────────

  if (!session) {
    return <SessionSetup onStart={handleStartSession} isLoading={isStarting} />;
  }

  // ─────────────────────────────────────────
  // Render: Chat UI
  // ─────────────────────────────────────────

  const visibleMessages = messages.filter((m) => !m.hidden);
  const topicDisplay =
    session.topic.toLowerCase() === "general"
      ? "🌍 General"
      : `💬 ${session.topic.charAt(0).toUpperCase() + session.topic.slice(1)}`;

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* ── Header ── */}
      <div className="bg-[#293142] text-white px-4 py-3 flex items-center justify-between shadow-lg flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Image
            src="/images/lingo-white.png"
            alt="Studio Lingo"
            width={110}
            height={32}
            className="object-contain flex-shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="h-5 w-px bg-white/30 flex-shrink-0" />
          <div className="flex items-center gap-2 min-w-0">
            <span className="bg-[#2f9e4d] text-white text-xs font-bold px-2 py-1 rounded-md flex-shrink-0">
              {session.level}
            </span>
            <span className="text-white/80 text-sm truncate">
              {topicDisplay}
            </span>
          </div>
        </div>
        <button
          onClick={handleNewSession}
          className="text-white/70 hover:text-white text-sm flex items-center gap-1.5 transition-colors flex-shrink-0 ml-3"
          title="Start a new session"
        >
          <IconRefresh />
          <span className="hidden sm:inline">New Session</span>
        </button>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
        {visibleMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {/* ── Bot Message ── */}
            {message.role === "assistant" && (
              <div className="flex items-end gap-2 max-w-[88%] sm:max-w-[72%]">
                <div className="w-8 h-8 rounded-full bg-[#2f9e4d] flex items-center justify-center flex-shrink-0 mb-7 shadow-sm">
                  <span className="text-white text-[10px] font-bold">AI</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
                    <p className="text-[#293142] text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>

                  {message.showTranslation && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5">
                      {message.isTranslating ? (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                          <p className="text-blue-500 text-xs">
                            Translating...
                          </p>
                        </div>
                      ) : (
                        <p className="text-blue-900 text-sm leading-relaxed">
                          {message.translation}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    {/* 🔊 Audio button */}
                    <button
                      onClick={() =>
                        playingMessageId === message.id
                          ? stopSpeaking()
                          : speakMessage(message.content, message.id)
                      }
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        playingMessageId === message.id
                          ? "bg-[#2f9e4d] text-white shadow-sm"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                      title={
                        playingMessageId === message.id
                          ? "Stop audio"
                          : "Listen to this message"
                      }
                    >
                      {playingMessageId === message.id ? (
                        <>
                          <IconStop />
                          <span>Stop</span>
                        </>
                      ) : (
                        <>
                          <IconVolume />
                          <span>Listen</span>
                        </>
                      )}
                    </button>

                    {/* 🌐 Translate button */}
                    <button
                      onClick={() =>
                        handleTranslate(message.id, message.content)
                      }
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        message.showTranslation
                          ? "bg-blue-500 text-white shadow-sm"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                      title="Translate to Georgian"
                    >
                      <span className="font-medium">ქარ</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── User Message ── */}
            {message.role === "user" && (
              <div className="flex flex-col items-end gap-1.5 max-w-[88%] sm:max-w-[72%]">
                <div className="bg-[#2f9e4d] rounded-2xl rounded-br-sm px-4 py-3 shadow-sm">
                  <p
                    className="text-sm leading-relaxed whitespace-pre-wrap"
                    style={{ color: "white" }}
                  >
                    {message.content}
                  </p>
                </div>

                {message.showCorrection && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 w-full">
                    {message.isCheckingGrammar ? (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                        <p className="text-amber-600 text-xs">
                          Checking grammar...
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-amber-700 text-xs font-semibold mb-1">
                          💡 More natural English:
                        </p>
                        <p className="text-amber-900 text-sm leading-relaxed">
                          {message.correction}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* ℹ Grammar button */}
                <button
                  onClick={() =>
                    handleGrammarCheck(message.id, message.content)
                  }
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    message.showCorrection
                      ? "bg-amber-400 text-white shadow-sm"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                  title="Check my grammar"
                >
                  <span className="font-bold text-sm leading-none">ℹ</span>
                  <span>Grammar</span>
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-[#2f9e4d] flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-white text-[10px] font-bold">AI</span>
              </div>
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex gap-1 items-center h-4">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input Area ── */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex-shrink-0 shadow-lg">
        <div className="flex items-center gap-2 max-w-3xl mx-auto">
          {/* 🎤 Voice button */}
          <button
            onClick={handleVoiceInput}
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              isRecording
                ? "bg-red-500 text-white animate-pulse shadow-md shadow-red-200"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200 shadow-sm"
            }`}
            title={
              isRecording ? "Stop recording" : "Voice input — speak in English"
            }
          >
            {isRecording ? <IconStopSquare /> : <IconMic />}
          </button>

          {/* Text input */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder={
              isRecording ? "🎤 Listening..." : "Type your message..."
            }
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-full text-[#293142] placeholder-gray-400 focus:outline-none focus:border-[#2f9e4d] transition-colors text-[16px] disabled:opacity-50 bg-gray-50"
          />

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2f9e4d] text-white flex items-center justify-center hover:bg-[#267a3d] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
            title="Send message"
          >
            <IconSend />
          </button>
        </div>

        {isRecording && (
          <p className="text-center text-red-500 text-xs mt-2 animate-pulse">
            🎤 Recording... Speak clearly in English, then tap the button to
            stop
          </p>
        )}
      </div>
    </div>
  );
}
