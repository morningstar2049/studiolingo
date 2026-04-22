'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import SessionSetup, { type Level } from './SessionSetup';

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

type Message = {
  id: string;
  role: 'user' | 'assistant';
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
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
  </svg>
);

const IconStop = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const IconMic = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
  </svg>
);

const IconStopSquare = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 6h12v12H6z" />
  </svg>
);

const IconSend = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const IconRefresh = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
  </svg>
);

const IconSpeakerOn = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);

const IconSpeakerOff = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zM19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
  </svg>
);

// ─────────────────────────────────────────
// Helpers: voice selection + rate by level
// ─────────────────────────────────────────

const getSpeechRate = (level: Level): number => {
  // Slower for beginners so they can follow each word
  if (level === 'A1') return 0.78;
  if (level === 'A2') return 0.85;
  if (level === 'B1') return 0.93;
  return 1.0; // B2, C1, C2
};

const pickBestVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined => {
  if (typeof navigator === 'undefined') return voices[0];
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua);
  const isAndroid = /Android/.test(ua);

  const find = (predicate: (v: SpeechSynthesisVoice) => boolean) => voices.find(predicate);
  const nameIs = (name: string) => (v: SpeechSynthesisVoice) =>
    v.name.toLowerCase() === name.toLowerCase();
  const nameIncludes = (s: string) => (v: SpeechSynthesisVoice) =>
    v.name.toLowerCase().includes(s.toLowerCase());

  if (isIOS) {
    // iOS has high-quality "Enhanced" and "Premium" voices when downloaded
    return (
      find((v) => nameIncludes('samantha')(v) && nameIncludes('enhanced')(v)) ||
      find((v) => nameIncludes('samantha')(v) && nameIncludes('premium')(v)) ||
      find(nameIs('Samantha')) ||
      find((v) => nameIncludes('ava')(v) && nameIncludes('enhanced')(v)) ||
      find(nameIs('Ava')) ||
      find(nameIs('Allison')) ||
      find(nameIs('Nicky')) ||
      find(nameIs('Karen')) ||
      find(nameIs('Daniel')) ||
      find((v) => v.lang === 'en-US') ||
      find((v) => v.lang.startsWith('en'))
    );
  }

  if (isAndroid) {
    return (
      find(nameIncludes('google us english')) ||
      find(nameIncludes('google uk english female')) ||
      find(nameIncludes('google uk english')) ||
      find((v) => v.lang === 'en-US' && nameIncludes('google')(v)) ||
      find((v) => v.lang === 'en-US') ||
      find((v) => v.lang.startsWith('en'))
    );
  }

  // Desktop
  return (
    find((v) => v.lang === 'en-US' && nameIncludes('google us english')(v)) ||
    find((v) => v.lang === 'en-US' && nameIncludes('google')(v)) ||
    find(nameIs('Samantha')) ||
    find(nameIs('Alex')) ||
    find((v) => v.lang === 'en-US') ||
    find((v) => v.lang.startsWith('en'))
  );
};

// Strip emojis and special symbols so TTS doesn't read them aloud
const stripEmojisForSpeech = (text: string): string =>
  text
    .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '')
    .replace(/[\uFE00-\uFE0F]/g, '')
    .replace(/\u200D/g, '')
    .replace(/\s+/g, ' ')
    .trim();

// ─────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────

export default function ChatInterface() {
  const [session, setSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  // Speaking mode: when ON, every bot reply auto-plays out loud
  const [speakerMode, setSpeakerMode] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef(false);
  const accumulatedTranscriptRef = useRef('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Pre-load TTS voices on mount (iOS often needs this triggered once)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      // Chrome fires voiceschanged after async voice loading
      const handleVoicesChanged = () => window.speechSynthesis.getVoices();
      window.speechSynthesis.addEventListener?.('voiceschanged', handleVoicesChanged);
      return () => {
        window.speechSynthesis.removeEventListener?.('voiceschanged', handleVoicesChanged);
      };
    }
  }, []);

  // Helper: update one message's fields
  const updateMessage = useCallback((id: string, updates: Partial<Message>) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  }, []);

  // ─────────────────────────────────────────
  // Text-to-Speech
  // ─────────────────────────────────────────

  const speakMessage = useCallback(
    (text: string, messageId: string, level?: Level) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      window.speechSynthesis.cancel();
      setPlayingMessageId(messageId);

      const cleanText = stripEmojisForSpeech(text);
      if (!cleanText) {
        setPlayingMessageId(null);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'en-US';
      utterance.rate = getSpeechRate(level || session?.level || 'B1');
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const preferred = pickBestVoice(voices);
      if (preferred) utterance.voice = preferred;

      utterance.onend = () => setPlayingMessageId(null);
      utterance.onerror = () => setPlayingMessageId(null);

      window.speechSynthesis.speak(utterance);
    },
    [session]
  );

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
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
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [{ role: 'user', content: 'Hello!' }],
            level,
            topic,
            isFirstMessage: true,
          }),
        });

        if (!res.ok) throw new Error('API error');
        const data = await res.json();

        const hiddenHello: Message = {
          id: generateId(),
          role: 'user',
          content: 'Hello!',
          hidden: true,
        };
        const welcomeMsg: Message = {
          id: generateId(),
          role: 'assistant',
          content: data.message,
        };

        setSession(newSession);
        setMessages([hiddenHello, welcomeMsg]);
        // Only auto-speak if speaker mode is on
        if (speakerMode) {
          setTimeout(() => speakMessage(data.message, welcomeMsg.id, level), 250);
        }
      } catch {
        const topicLabel =
          topic.toLowerCase() === 'general' ? 'all sorts of interesting things' : topic;
        const fallbackMsg: Message = {
          id: generateId(),
          role: 'assistant',
          content: `Hi there! 👋 I'm Alex, your English practice partner! I'm really excited to chat with you today. We're going to talk about ${topicLabel}! To kick things off — what do you already know about this topic?`,
        };
        setSession(newSession);
        setMessages([
          { id: generateId(), role: 'user', content: 'Hello!', hidden: true },
          fallbackMsg,
        ]);
        if (speakerMode) {
          setTimeout(() => speakMessage(fallbackMsg.content, fallbackMsg.id, level), 250);
        }
      } finally {
        setIsStarting(false);
      }
    },
    [speakMessage, speakerMode]
  );

  // ─────────────────────────────────────────
  // Voice Input — continuous recording
  // ─────────────────────────────────────────

  const stopRecording = useCallback(() => {
    isRecordingRef.current = false;
    setIsRecording(false);
    try {
      recognitionRef.current?.stop();
    } catch {
      /* noop */
    }
  }, []);

  const startRecording = useCallback(() => {
    const SpeechAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechAPI) {
      alert('Voice input is not supported in your browser. Please use Chrome or Safari.');
      return;
    }

    // Seed the accumulator with whatever is already typed
    accumulatedTranscriptRef.current = input ? input + ' ' : '';

    const recognition = new SpeechAPI();
    recognitionRef.current = recognition;
    recognition.lang = 'en-US';
    // Continuous + interim → records through pauses and shows live transcript
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      isRecordingRef.current = true;
      setIsRecording(true);
    };

    recognition.onresult = (event: any) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript: string = result[0].transcript;
        if (result.isFinal) {
          accumulatedTranscriptRef.current += transcript + ' ';
        } else {
          interim += transcript;
        }
      }
      setInput(accumulatedTranscriptRef.current + interim);
    };

    recognition.onend = () => {
      // Some browsers stop automatically after ~60s or during long silence.
      // If the user hasn't explicitly stopped, restart so recording stays continuous.
      if (isRecordingRef.current) {
        try {
          recognition.start();
        } catch {
          isRecordingRef.current = false;
          setIsRecording(false);
        }
      } else {
        setIsRecording(false);
      }
    };

    recognition.onerror = (event: any) => {
      // Silent gaps are fine; keep going
      if (event.error === 'no-speech' || event.error === 'aborted') return;
      console.error('Speech recognition error:', event.error);
      isRecordingRef.current = false;
      setIsRecording(false);
    };

    try {
      recognition.start();
    } catch (err) {
      console.error('Failed to start recognition:', err);
      isRecordingRef.current = false;
      setIsRecording(false);
    }
  }, [input]);

  const handleVoiceInput = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  // ─────────────────────────────────────────
  // Send Message
  // ─────────────────────────────────────────

  const sendMessage = useCallback(
    async (userText: string, currentMessages: Message[], sessionData: Session) => {
      if (!userText.trim() || isLoading) return;

      const userMsg: Message = {
        id: generateId(),
        role: 'user',
        content: userText.trim(),
      };

      const newMessages = [...currentMessages, userMsg];
      setMessages(newMessages);
      setInput('');
      accumulatedTranscriptRef.current = '';
      setIsLoading(true);

      try {
        const apiMessages = newMessages.map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        }));

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: apiMessages,
            level: sessionData.level,
            topic: sessionData.topic,
            isFirstMessage: false,
          }),
        });

        if (!res.ok) throw new Error('API error');
        const data = await res.json();

        const botMsg: Message = {
          id: generateId(),
          role: 'assistant',
          content: data.message,
        };

        setMessages((prev) => [...prev, botMsg]);
        // Only auto-play if speaker mode is ON
        if (speakerMode) {
          setTimeout(() => speakMessage(data.message, botMsg.id, sessionData.level), 100);
        }
      } catch {
        const errMsg: Message = {
          id: generateId(),
          role: 'assistant',
          content: "I'm sorry, I had a connection issue. Could you try sending your message again?",
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, speakMessage, speakerMode]
  );

  const handleSend = useCallback(() => {
    if (!session || !input.trim() || isLoading) return;
    // If recording, stop first so we capture anything still pending
    if (isRecordingRef.current) stopRecording();
    sendMessage(input, messages, session);
  }, [session, input, isLoading, messages, sendMessage, stopRecording]);

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
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });
        const data = await res.json();
        if (!res.ok) {
          console.error('Translate response error:', data);
          throw new Error(data.error || 'API error');
        }
        updateMessage(messageId, {
          translation: data.translation || 'Translation failed.',
          isTranslating: false,
        });
      } catch (err) {
        console.error('Translate fetch error:', err);
        updateMessage(messageId, {
          translation: 'Translation failed. Please try again.',
          isTranslating: false,
        });
      }
    },
    [messages, updateMessage]
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

      updateMessage(messageId, { isCheckingGrammar: true, showCorrection: true });

      try {
        const res = await fetch('/api/grammar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });
        const data = await res.json();
        updateMessage(messageId, {
          correction: data.corrected || 'Grammar check failed.',
          isCheckingGrammar: false,
        });
      } catch {
        updateMessage(messageId, {
          correction: 'Grammar check failed. Please try again.',
          isCheckingGrammar: false,
        });
      }
    },
    [messages, updateMessage]
  );

  // ─────────────────────────────────────────
  // Speaker mode toggle
  // ─────────────────────────────────────────

  const toggleSpeakerMode = useCallback(() => {
    setSpeakerMode((prev) => {
      const next = !prev;
      if (!next) {
        // Turning off: stop anything currently speaking
        stopSpeaking();
      }
      return next;
    });
  }, [stopSpeaking]);

  // ─────────────────────────────────────────
  // New Session
  // ─────────────────────────────────────────

  const handleNewSession = useCallback(() => {
    stopSpeaking();
    stopRecording();
    accumulatedTranscriptRef.current = '';
    setSession(null);
    setMessages([]);
    setInput('');
    setIsLoading(false);
  }, [stopSpeaking, stopRecording]);

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
    session.topic.toLowerCase() === 'general'
      ? 'General'
      : `${session.topic.charAt(0).toUpperCase() + session.topic.slice(1)}`;
  const topicIcon = session.topic.toLowerCase() === 'general' ? '🌍' : '💬';

  // White style object to beat parent site's global CSS color rules
  const whiteText = { color: '#ffffff' } as const;

  return (
    // fixed inset-0 makes the chat take over the FULL viewport, overriding
    // the studiolingo.ge site layout (logo/hamburger nav) completely.
    // h-[100dvh] handles mobile browser URL-bar collapse so the input never
    // sits below the fold.
    <div
      className="fixed inset-0 z-[9999] flex flex-col bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      style={{ height: '100dvh' }}
    >

      {/* ── Header (frosted glass, iOS-inspired) ── */}
      <div
        className="px-4 py-3.5 flex items-center justify-between flex-shrink-0 border-b"
        style={{
          background: 'linear-gradient(180deg, #293142 0%, #1f2635 100%)',
          borderBottomColor: 'rgba(255,255,255,0.08)',
          boxShadow: '0 1px 24px rgba(41,49,66,0.12)',
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <Image
            src="/images/lingo-white.png"
            alt="Studio Lingo"
            width={104}
            height={30}
            className="object-contain flex-shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="h-5 w-px flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="text-[11px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 tracking-wide"
              style={{
                ...whiteText,
                backgroundColor: '#2f9e4d',
                boxShadow: '0 1px 4px rgba(47,158,77,0.4)',
              }}
            >
              {session.level}
            </span>
            <span className="text-sm truncate font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
              <span className="mr-1">{topicIcon}</span>
              <span style={whiteText}>{topicDisplay}</span>
            </span>
          </div>
        </div>

        {/* Right cluster: speaker toggle + new session */}
        <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
          {/* Speaker mode toggle */}
          <button
            onClick={toggleSpeakerMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{
              ...whiteText,
              backgroundColor: speakerMode ? '#2f9e4d' : 'rgba(255,255,255,0.1)',
              boxShadow: speakerMode ? '0 2px 8px rgba(47,158,77,0.45)' : 'none',
            }}
            title={speakerMode ? 'Speaking mode ON — bot replies play automatically' : 'Speaking mode OFF — tap to auto-play replies'}
            aria-label="Toggle speaking mode"
          >
            <span style={whiteText}>
              {speakerMode ? <IconSpeakerOn /> : <IconSpeakerOff />}
            </span>
            <span className="hidden sm:inline" style={whiteText}>
              {speakerMode ? 'Speaking' : 'Muted'}
            </span>
          </button>

          {/* New session */}
          <button
            onClick={handleNewSession}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all"
            style={{
              ...whiteText,
              backgroundColor: 'rgba(255,255,255,0.1)',
            }}
            title="Start a new session"
          >
            <span style={whiteText}><IconRefresh /></span>
            <span className="hidden sm:inline" style={whiteText}>New</span>
          </button>
        </div>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {visibleMessages.map((message) => (
          <div
            key={message.id}
            className={`flex animate-in fade-in slide-in-from-bottom-2 duration-300 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {/* ── Bot Message ── */}
            {message.role === 'assistant' && (
              <div className="flex items-end gap-2 max-w-[88%] sm:max-w-[72%]">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mb-8"
                  style={{
                    background: 'linear-gradient(135deg, #2f9e4d 0%, #267a3d 100%)',
                    boxShadow: '0 2px 8px rgba(47,158,77,0.3)',
                  }}
                >
                  <span className="text-[10px] font-bold tracking-wide" style={whiteText}>AI</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div
                    className="bg-white px-4 py-3"
                    style={{
                      borderRadius: '22px 22px 22px 6px',
                      boxShadow: '0 2px 14px rgba(41,49,66,0.07), 0 0 0 1px rgba(41,49,66,0.04)',
                    }}
                  >
                    <p
                      className="text-[15px] leading-[1.45] whitespace-pre-wrap"
                      style={{ color: '#293142', letterSpacing: '-0.01em' }}
                    >
                      {message.content}
                    </p>
                  </div>

                  {message.showTranslation && (
                    <div
                      className="px-3.5 py-2.5 animate-in fade-in slide-in-from-top-1 duration-200"
                      style={{
                        borderRadius: '16px',
                        backgroundColor: '#eff6ff',
                        border: '1px solid #dbeafe',
                      }}
                    >
                      {message.isTranslating ? (
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 border-2 border-t-transparent rounded-full animate-spin"
                            style={{ borderColor: '#60a5fa', borderTopColor: 'transparent' }}
                          />
                          <p className="text-xs" style={{ color: '#3b82f6' }}>Translating...</p>
                        </div>
                      ) : (
                        <p className="text-[14px] leading-relaxed" style={{ color: '#1e3a8a' }}>
                          {message.translation}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    {/* Listen button */}
                    <button
                      onClick={() =>
                        playingMessageId === message.id
                          ? stopSpeaking()
                          : speakMessage(message.content, message.id)
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all"
                      style={
                        playingMessageId === message.id
                          ? {
                              ...whiteText,
                              backgroundColor: '#2f9e4d',
                              boxShadow: '0 2px 6px rgba(47,158,77,0.35)',
                            }
                          : { color: '#6b7280', backgroundColor: '#f3f4f6' }
                      }
                      title={playingMessageId === message.id ? 'Stop audio' : 'Listen to this message'}
                    >
                      <span style={playingMessageId === message.id ? whiteText : { color: '#6b7280' }}>
                        {playingMessageId === message.id ? <IconStop /> : <IconVolume />}
                      </span>
                      <span style={playingMessageId === message.id ? whiteText : { color: '#6b7280' }}>
                        {playingMessageId === message.id ? 'Stop' : 'Listen'}
                      </span>
                    </button>

                    {/* Translate button */}
                    <button
                      onClick={() => handleTranslate(message.id, message.content)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all"
                      style={
                        message.showTranslation
                          ? {
                              ...whiteText,
                              backgroundColor: '#3b82f6',
                              boxShadow: '0 2px 6px rgba(59,130,246,0.35)',
                            }
                          : { color: '#6b7280', backgroundColor: '#f3f4f6' }
                      }
                      title="Translate to Georgian"
                    >
                      <span style={message.showTranslation ? whiteText : { color: '#6b7280' }}>ქარ</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── User Message ── */}
            {message.role === 'user' && (
              <div className="flex flex-col items-end gap-2 max-w-[88%] sm:max-w-[72%]">
                <div
                  className="px-4 py-3"
                  style={{
                    borderRadius: '22px 22px 6px 22px',
                    background: 'linear-gradient(135deg, #2f9e4d 0%, #267a3d 100%)',
                    boxShadow: '0 2px 14px rgba(47,158,77,0.25)',
                  }}
                >
                  <p
                    className="text-[15px] leading-[1.45] whitespace-pre-wrap"
                    style={{ ...whiteText, letterSpacing: '-0.01em' }}
                  >
                    {message.content}
                  </p>
                </div>

                {message.showCorrection && (
                  <div
                    className="px-3.5 py-2.5 w-full animate-in fade-in slide-in-from-top-1 duration-200"
                    style={{
                      borderRadius: '16px',
                      backgroundColor: '#fffbeb',
                      border: '1px solid #fde68a',
                    }}
                  >
                    {message.isCheckingGrammar ? (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 border-2 border-t-transparent rounded-full animate-spin"
                          style={{ borderColor: '#fbbf24', borderTopColor: 'transparent' }}
                        />
                        <p className="text-xs" style={{ color: '#b45309' }}>Checking grammar...</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs font-semibold mb-1" style={{ color: '#b45309' }}>
                          💡 More natural English:
                        </p>
                        <p className="text-[14px] leading-relaxed" style={{ color: '#78350f' }}>
                          {message.correction}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={() => handleGrammarCheck(message.id, message.content)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all"
                  style={
                    message.showCorrection
                      ? {
                          ...whiteText,
                          backgroundColor: '#f59e0b',
                          boxShadow: '0 2px 6px rgba(245,158,11,0.35)',
                        }
                      : { color: '#6b7280', backgroundColor: '#f3f4f6' }
                  }
                  title="Check my grammar"
                >
                  <span
                    className="font-bold text-sm leading-none"
                    style={message.showCorrection ? whiteText : { color: '#6b7280' }}
                  >
                    ℹ
                  </span>
                  <span style={message.showCorrection ? whiteText : { color: '#6b7280' }}>Grammar</span>
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex justify-start animate-in fade-in duration-200">
            <div className="flex items-end gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #2f9e4d 0%, #267a3d 100%)',
                  boxShadow: '0 2px 8px rgba(47,158,77,0.3)',
                }}
              >
                <span className="text-[10px] font-bold" style={whiteText}>AI</span>
              </div>
              <div
                className="bg-white px-4 py-3"
                style={{
                  borderRadius: '22px 22px 22px 6px',
                  boxShadow: '0 2px 14px rgba(41,49,66,0.07), 0 0 0 1px rgba(41,49,66,0.04)',
                }}
              >
                <div className="flex gap-1.5 items-center h-4">
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ backgroundColor: '#9ca3af', animationDelay: '0ms' }}
                  />
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ backgroundColor: '#9ca3af', animationDelay: '150ms' }}
                  />
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ backgroundColor: '#9ca3af', animationDelay: '300ms' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input Area ── */}
      <div
        className="px-4 py-3 flex-shrink-0"
        style={{
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(41,49,66,0.08)',
          boxShadow: '0 -4px 20px rgba(41,49,66,0.05)',
          paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))',
        }}
      >
        <div className="flex items-center gap-2 max-w-3xl mx-auto">
          {/* Voice button */}
          <button
            onClick={handleVoiceInput}
            className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95"
            style={
              isRecording
                ? {
                    ...whiteText,
                    backgroundColor: '#ef4444',
                    boxShadow: '0 4px 16px rgba(239,68,68,0.4), 0 0 0 4px rgba(239,68,68,0.15)',
                    animation: 'pulse 1.5s ease-in-out infinite',
                  }
                : { color: '#6b7280', backgroundColor: '#f3f4f6' }
            }
            title={isRecording ? 'Stop recording' : 'Voice input — speak in English'}
          >
            <span style={isRecording ? whiteText : { color: '#6b7280' }}>
              {isRecording ? <IconStopSquare /> : <IconMic />}
            </span>
          </button>

          {/* Text input */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              // If user edits manually while not recording, keep accumulator in sync
              if (!isRecordingRef.current) {
                accumulatedTranscriptRef.current = e.target.value;
              }
            }}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder={isRecording ? 'Listening... tap mic to stop' : 'Type your message...'}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-full transition-all text-[16px] disabled:opacity-50"
            style={{
              border: '1px solid rgba(41,49,66,0.12)',
              backgroundColor: '#ffffff',
              color: '#293142',
              boxShadow: 'inset 0 1px 2px rgba(41,49,66,0.04)',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#2f9e4d';
              e.currentTarget.style.boxShadow =
                'inset 0 1px 2px rgba(41,49,66,0.04), 0 0 0 3px rgba(47,158,77,0.12)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(41,49,66,0.12)';
              e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(41,49,66,0.04)';
            }}
          />

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              ...whiteText,
              background: 'linear-gradient(135deg, #2f9e4d 0%, #267a3d 100%)',
              boxShadow: '0 3px 12px rgba(47,158,77,0.35)',
            }}
            title="Send message"
          >
            <span style={whiteText}><IconSend /></span>
          </button>
        </div>

        {isRecording && (
          <p
            className="text-center text-xs mt-2 font-medium"
            style={{ color: '#ef4444', animation: 'pulse 1.5s ease-in-out infinite' }}
          >
            🎤 Recording continuously... tap mic to stop, or Send to send
          </p>
        )}
      </div>

    </div>
  );
}
