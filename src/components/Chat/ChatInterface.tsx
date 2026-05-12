'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import SessionSetup, { type Level } from './SessionSetup';

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  hidden?: boolean;
  translation?: string;
  isTranslating?: boolean;
  showTranslation?: boolean;
  correction?: string;
  isCheckingGrammar?: boolean;
  showCorrection?: boolean;
  // v5: pre-fetched OpenAI TTS blob URL for instant Listen playback
  audioUrl?: string;
  isPreloadingAudio?: boolean;
  // Rate-limit notice rendered as a Georgian red message, no action buttons
  isLimitReached?: boolean;
};

type Session = { level: Level; topic: string };

const generateId = () => Math.random().toString(36).substring(2, 9);

// ─────────────────────────────────────────
// Brand colour tokens (green / dark-blue / white only)
// ─────────────────────────────────────────

const C = {
  green: '#2f9e4d',
  greenDark: '#267a3d',
  greenLight: '#f0fdf4',   // very pale green for info boxes
  blue: '#293142',          // "dark blue" brand colour
  blueDark: '#1f2635',
  white: '#ffffff',
  textPrimary: '#293142',
  textMuted: '#6b7280',
  border: 'rgba(41,49,66,0.1)',
} as const;

const W: React.CSSProperties = { color: C.white };

// ─────────────────────────────────────────
// Icons
// ─────────────────────────────────────────

const IconVolume = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
  </svg>
);
const IconPause = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);
const IconMic = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
  </svg>
);
const IconMicStop = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 6h12v12H6z" />
  </svg>
);
const IconSend = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);
const IconRefresh = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
  </svg>
);
const IconSpeakerOn = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);
const IconSpeakerOff = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zM19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
  </svg>
);

// ─────────────────────────────────────────
// TTS helpers
// ─────────────────────────────────────────

const getSpeechRate = (level: Level): number => {
  if (level === 'A1') return 0.78;
  if (level === 'A2') return 0.85;
  if (level === 'B1') return 0.93;
  return 1.0;
};

const pickBestVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined => {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const isIOS = /iPad|iPhone|iPod/.test(ua);
  const isAndroid = /Android/.test(ua);

  const byExactName = (n: string) => voices.find(v => v.name === n);
  const byPartialName = (s: string) => voices.find(v => v.name.toLowerCase().includes(s));
  const byLang = (l: string) => voices.find(v => v.lang === l);

  if (isIOS) {
    return (
      byPartialName('samantha') ||
      byExactName('Ava') ||
      byExactName('Nicky') ||
      byExactName('Allison') ||
      byExactName('Karen') ||
      byExactName('Daniel') ||
      byLang('en-US') ||
      voices.find(v => v.lang.startsWith('en'))
    );
  }
  if (isAndroid) {
    return (
      byPartialName('google us english') ||
      byPartialName('google uk english female') ||
      byPartialName('google uk english') ||
      voices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('google')) ||
      byLang('en-US') ||
      voices.find(v => v.lang.startsWith('en'))
    );
  }
  // Desktop
  return (
    byPartialName('google us english') ||
    byPartialName('google') ||
    byExactName('Samantha') ||
    byExactName('Alex') ||
    byLang('en-US') ||
    voices.find(v => v.lang.startsWith('en'))
  );
};

const stripEmojis = (text: string) =>
  text
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/[\u{FE00}-\u{FE0F}]/gu, '')
    .replace(/\u200D/g, '')
    .replace(/\s+/g, ' ')
    .trim();

// ─────────────────────────────────────────
// Main component
// ─────────────────────────────────────────

export default function ChatInterface() {
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [speakerMode, setSpeakerMode] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  // Tracks the chat-container height so it can shrink above the soft keyboard
  // on iOS (where 100dvh doesn't account for the keyboard). Initial value is
  // 100dvh; switched to a pixel height as soon as visualViewport reports.
  const [chatHeight, setChatHeight] = useState<string>('100dvh');
  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef(false);
  // v5: on iOS we accumulate final text across fresh sub-sessions
  const accumulatedRef = useRef('');
  const inputRef = useRef<HTMLInputElement>(null);
  // Holds the currently-playing Audio element so we can stop it
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  // Holds the active Web Speech utterance so we can silence its handlers before cancel()
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  // v8: iOS AudioContext unlock flag — true once the silent buffer has been played
  const iosAudioUnlockedRef = useRef(false);
  // v9: keep the AudioContext alive in a ref so iOS doesn't GC it and revert the
  // audio session back to earpiece/quiet mode between plays
  const audioCtxRef = useRef<AudioContext | null>(null);
  // v10: tracks an AudioBufferSourceNode used for iOS auto-play (Web Audio path)
  const currentAudioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Mount flag for portal (must be client-side)
  useEffect(() => { setMounted(true); }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mobile keyboard fix.
  //
  // Two things go wrong when the soft keyboard opens:
  //   1. iOS Safari: `100dvh` does NOT shrink for the keyboard, so the chat
  //      stays full-height and the input + last messages hide under the keyboard.
  //   2. Both platforms: even when the chat shrinks (Android), the messages
  //      list's scrollTop isn't updated, so the latest bot reply scrolls above
  //      the visible area.
  //
  // Fix is intentionally surgical:
  //   - Clamp the chat root to `visualViewport.height` whenever it changes —
  //     this physically shrinks the chat above the keyboard on iOS, and is a
  //     no-op on Android (where 100dvh already shrank to the same value).
  //   - Re-anchor the messages list by setting the container's scrollTop to
  //     its scrollHeight. We use scrollTop on a single element (NOT
  //     scrollIntoView) so the page body / header are guaranteed not to move.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) return;
    const vv = window.visualViewport;
    const onResize = () => {
      setChatHeight(`${vv.height}px`);
      // Defer so the new height has applied before we re-anchor scroll.
      requestAnimationFrame(() => {
        const el = messagesContainerRef.current;
        if (el) el.scrollTop = el.scrollHeight;
      });
    };
    vv.addEventListener('resize', onResize);
    return () => { vv.removeEventListener('resize', onResize); };
  }, []);

  // Pre-load voices (Chrome fires voiceschanged async)
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.getVoices();
    const onVoicesChanged = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener?.('voiceschanged', onVoicesChanged);
    return () => window.speechSynthesis.removeEventListener?.('voiceschanged', onVoicesChanged);
  }, []);

  // v8: iOS AudioContext unlock
  // Playing a silent 1-sample AudioContext buffer inside a user gesture (touchstart
  // or click) switches the iOS audio session from "call" (earpiece, quiet) to
  // "playback" (loudspeaker, full volume). Once unlocked for the page session:
  //   • All subsequent audio.play() calls work even in async contexts (fixes Bug 2)
  //   • Audio routes through the loudspeaker at full volume (fixes Bug 3)
  useEffect(() => {
    const unlock = () => {
      if (iosAudioUnlockedRef.current) return;
      try {
        const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
        const ctx = new Ctx();
        // Store in ref — CRITICAL: keeps the AudioContext from being GC'd so that
        // iOS holds the "playback" audio session for the full page lifetime.
        // Without this the session reverts to earpiece/quiet mode after unlock() returns.
        audioCtxRef.current = ctx;
        const buf = ctx.createBuffer(1, 1, 22050);
        const src = ctx.createBufferSource();
        src.buffer = buf;
        src.connect(ctx.destination);
        src.start(0);
        iosAudioUnlockedRef.current = true;
      } catch { /* ignore — non-iOS browsers may not need this */ }
    };
    document.addEventListener('touchstart', unlock, { once: true, passive: true });
    document.addEventListener('click', unlock, { once: true });
    return () => {
      document.removeEventListener('touchstart', unlock);
      document.removeEventListener('click', unlock);
    };
  }, []);

  const updateMessage = useCallback((id: string, updates: Partial<Message>) => {
    setMessages(prev => prev.map(m => (m.id === id ? { ...m, ...updates } : m)));
  }, []);

  // ── Browser TTS ────────────────────────────────────────────────────────────
  // Fallback for speaking-mode auto-play when OpenAI TTS is unavailable,
  // and as a fallback if audio.play() is blocked by the browser autoplay policy.

  const speakWithBrowser = useCallback((clean: string, msgId: string, level?: Level) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setPlayingId(msgId);

    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua);

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'en-US';
    utterance.rate = getSpeechRate(level || session?.level || 'B1');
    utterance.pitch = isIOS ? 1.05 : 1.0;
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const best = pickBestVoice(voices);
    if (best) utterance.voice = best;

    // Store in ref so stopSpeaking can silence these handlers before cancel()
    // (some browsers fire onend/onerror when cancel() is called, which could
    // cause a ghost setPlayingId call that interferes with stop behaviour)
    currentUtteranceRef.current = utterance;
    utterance.onend = () => { currentUtteranceRef.current = null; setPlayingId(null); };
    utterance.onerror = () => { currentUtteranceRef.current = null; setPlayingId(null); };
    window.speechSynthesis.speak(utterance);
  }, [session]);

  // ── OpenAI TTS (Listen button) ─────────────────────────────────────────────
  // v5: accepts a pre-fetched blob URL for instant playback.
  // If no URL is provided (pre-fetch failed or hasn't started), falls back to
  // a live fetch and then to browser TTS.

  const speakMessage = useCallback(async (
    text: string, msgId: string, level?: Level, audioUrl?: string
  ) => {
    if (typeof window === 'undefined') return;

    const clean = stripEmojis(text);
    if (!clean) return;

    // Stop anything currently playing (silence handlers first to prevent callbacks)
    if (currentAudioRef.current) {
      currentAudioRef.current.onended = null;
      currentAudioRef.current.onerror = null;
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    // v11: also stop the iOS AudioBufferSourceNode (auto-play path) — without
    // this, pressing Listen while auto-play is active causes both to play at once.
    if (currentAudioSourceRef.current) {
      currentAudioSourceRef.current.onended = null;
      try { currentAudioSourceRef.current.stop(); } catch { /* already ended */ }
      currentAudioSourceRef.current = null;
    }
    if (currentUtteranceRef.current) {
      currentUtteranceRef.current.onend = null;
      currentUtteranceRef.current.onerror = null;
      currentUtteranceRef.current = null;
    }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setPlayingId(msgId);

    // ── Fast path: pre-fetched blob URL ──────────────────────────────────────
    if (audioUrl) {
      // v11: do NOT await resume() before audio.play() — any await breaks the
      // iOS user-gesture chain and causes play() to be silently blocked.
      // Instead: kick off resume() non-blocking (for loudspeaker routing on the
      // NEXT play), connect to AudioContext only if it's already running right
      // now, then call play() synchronously while still inside the gesture.
      if (audioCtxRef.current && audioCtxRef.current.state !== 'running') {
        audioCtxRef.current.resume().catch(() => {}); // non-blocking
      }
      const audio = new Audio(audioUrl);
      audio.volume = 1.0;
      // Only connect MediaElementSource if context is already running — connecting
      // to a suspended context would route audio into a silent graph.
      if (audioCtxRef.current?.state === 'running') {
        try {
          const src = audioCtxRef.current.createMediaElementSource(audio);
          src.connect(audioCtxRef.current.destination);
        } catch { /* non-critical — falls back to normal routing */ }
      }
      currentAudioRef.current = audio;
      // Don't revoke the blob URL on end — keep it for replaying
      audio.onended = () => { currentAudioRef.current = null; setPlayingId(null); };
      audio.onerror = () => { currentAudioRef.current = null; setPlayingId(null); };
      // No await — keeps us inside the gesture call stack on iOS
      audio.play().catch(err => {
        console.warn('Pre-fetched audio play failed, using browser TTS:', err);
        currentAudioRef.current = null;
        setPlayingId(null);
        speakWithBrowser(clean, msgId, level);
      });
      return;
    }

    // ── Slow path: fetch on-demand (no pre-fetch available) ─────────────────
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: clean, level: level || session?.level || 'B1' }),
      });
      if (!res.ok) throw new Error(`TTS API ${res.status}`);

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'running') {
        try { await audioCtxRef.current.resume(); } catch { /* ignore */ }
      }
      const audio = new Audio(url);
      audio.volume = 1.0;
      if (audioCtxRef.current?.state === 'running') {
        try {
          const src = audioCtxRef.current.createMediaElementSource(audio);
          src.connect(audioCtxRef.current.destination);
        } catch { /* non-critical */ }
      }
      currentAudioRef.current = audio;

      audio.onended = () => {
        URL.revokeObjectURL(url); // on-demand URLs are safe to revoke after use
        currentAudioRef.current = null;
        setPlayingId(null);
      };
      audio.onerror = () => {
        URL.revokeObjectURL(url);
        currentAudioRef.current = null;
        setPlayingId(null);
      };
      await audio.play();
    } catch (err) {
      console.warn('OpenAI TTS unavailable, using browser voice:', err);
      speakWithBrowser(clean, msgId, level);
    }
  }, [session, speakWithBrowser]);

  // ── TTS pre-fetch + speaking-mode auto-play ───────────────────────────────
  // Always pre-fetches the OpenAI audio blob for instant Listen playback.
  // When autoPlay=true (speaking mode on), also plays the audio once ready.
  //
  // Why fetch-then-play instead of speakWithBrowser for speaking mode?
  // Audio.play() on an already-loaded blob succeeds even in async context on
  // any browser where the user has previously interacted with audio — which is
  // always true by the time the first bot reply arrives (the user clicked Start,
  // tapped level buttons, etc.). This gives the natural OpenAI voice for both
  // speaking mode AND the Listen button.

  const preloadAudio = useCallback(async (
    msgId: string, text: string, level: Level, autoPlay = false
  ) => {
    const clean = stripEmojis(text);
    if (!clean) return;

    updateMessage(msgId, { isPreloadingAudio: true });
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: clean, level }),
      });
      if (!res.ok) throw new Error(`TTS API ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      // Store in message state for instant Listen playback
      updateMessage(msgId, { audioUrl: url, isPreloadingAudio: false });

      // ── Auto-play for speaking mode ─────────────────────────────────────
      if (autoPlay) {
        // Don't auto-play while the user is recording (avoid talking over them)
        if (isRecordingRef.current) return;

        // Stop whatever is currently playing — the latest reply is most relevant
        if (currentAudioRef.current) {
          currentAudioRef.current.onended = null;
          currentAudioRef.current.onerror = null;
          currentAudioRef.current.pause();
          currentAudioRef.current = null;
        }
        if (currentAudioSourceRef.current) {
          currentAudioSourceRef.current.onended = null;
          try { currentAudioSourceRef.current.stop(); } catch { /* already ended */ }
          currentAudioSourceRef.current = null;
        }
        if (currentUtteranceRef.current) {
          currentUtteranceRef.current.onend = null;
          currentUtteranceRef.current.onerror = null;
          currentUtteranceRef.current = null;
        }
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        if (isIOS && audioCtxRef.current) {
          // v10 iOS path: audio.play() in async context is blocked by iOS even
          // after AudioContext unlock. Use AudioContext.decodeAudioData +
          // AudioBufferSourceNode.start() instead — Web Audio API start() is
          // unlocked when the AudioContext was created in a user gesture, with
          // no async restriction. This is the only fully reliable iOS solution.
          try {
            if (audioCtxRef.current.state !== 'running') {
              await audioCtxRef.current.resume();
            }
            if (isRecordingRef.current) return; // user started mic during resume
            const arrayBuffer = await fetch(url).then(r => r.arrayBuffer());
            if (isRecordingRef.current) return; // user started mic during fetch
            const audioBuffer = await audioCtxRef.current.decodeAudioData(arrayBuffer);
            if (isRecordingRef.current) return; // user started mic during decode
            const source = audioCtxRef.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioCtxRef.current.destination);
            currentAudioSourceRef.current = source;
            setPlayingId(msgId);
            source.onended = () => {
              if (currentAudioSourceRef.current === source) currentAudioSourceRef.current = null;
              setPlayingId(null);
            };
            source.start(0);
          } catch {
            currentAudioSourceRef.current = null;
            setPlayingId(null);
            if (!isRecordingRef.current) speakWithBrowser(clean, msgId, level);
          }
        } else {
          // Non-iOS: audio.play() works in async context after AudioContext unlock
          if (audioCtxRef.current && audioCtxRef.current.state !== 'running') {
            try { await audioCtxRef.current.resume(); } catch { /* ignore */ }
          }
          setPlayingId(msgId);
          const audio = new Audio(url);
          audio.volume = 1.0;
          if (audioCtxRef.current?.state === 'running') {
            try {
              const src = audioCtxRef.current.createMediaElementSource(audio);
              src.connect(audioCtxRef.current.destination);
            } catch { /* non-critical */ }
          }
          currentAudioRef.current = audio;
          audio.onended = () => { currentAudioRef.current = null; setPlayingId(null); };
          audio.onerror = () => { currentAudioRef.current = null; setPlayingId(null); };
          try {
            await audio.play();
          } catch {
            currentAudioRef.current = null;
            setPlayingId(null);
            speakWithBrowser(clean, msgId, level);
          }
        }
      }
    } catch (err) {
      // Pre-fetch failed (no API key, rate limit, etc.)
      console.warn('TTS pre-fetch failed:', err);
      updateMessage(msgId, { isPreloadingAudio: false });
      // If speaking mode was waiting for this audio, fall back to browser TTS
      if (autoPlay && !isRecordingRef.current) speakWithBrowser(clean, msgId, level);
    }
  }, [updateMessage, speakWithBrowser]);

  const stopSpeaking = useCallback(() => {
    // ── OpenAI Audio element ──────────────────────────────────────────────────
    if (currentAudioRef.current) {
      const audio = currentAudioRef.current;
      // Silence handlers BEFORE pausing — prevents ghost callbacks.
      // On some browsers, pause() near the end of playback can trigger onended.
      audio.onended = null;
      audio.onerror = null;
      audio.pause();
      currentAudioRef.current = null;
    }
    // ── iOS Web Audio path (AudioBufferSourceNode) ────────────────────────────
    if (currentAudioSourceRef.current) {
      currentAudioSourceRef.current.onended = null;
      try { currentAudioSourceRef.current.stop(); } catch { /* already ended */ }
      currentAudioSourceRef.current = null;
    }
    // ── Web Speech API utterance ──────────────────────────────────────────────
    if (currentUtteranceRef.current) {
      // Silence onend/onerror before cancel() so the browser's cancel-fired
      // onend event doesn't call setPlayingId after we've already stopped.
      currentUtteranceRef.current.onend = null;
      currentUtteranceRef.current.onerror = null;
      currentUtteranceRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingId(null);
  }, []);

  // ── Voice input ────────────────────────────────────────────────────────────
  // v8: UNIFIED approach for ALL platforms — continuous:false + fresh
  // SpeechRecognition instances on every sub-session restart.
  //
  // Problems solved:
  //   1. continuous:false  — each sub-session covers one utterance; restarts clean.
  //   2. Fresh SpeechRecognition instances — zero state carryover between restarts.
  //   3. TTS stopped inline at recording start — mic can't pick up TTS playback.
  //   4. 200ms grace period (recordingStartTime) — finals within 200ms of mic start
  //      are discarded. iOS sometimes fires an immediate final from cached TTS audio
  //      in the mic buffer; real speech takes >200ms to produce a first word. This
  //      guard catches the ghost without affecting real transcription. It lives in
  //      the outer startRecording scope so it is NOT reset per sub-session restart
  //      (only the first ~200ms after the tap matters).
  //   5. startsWith dedup — if result[i] starts with result[i-1], treat as an
  //      updated/extended version of the same segment (Android incremental
  //      cumulative behaviour) — replace, don't concatenate.

  const stopRecording = useCallback(() => {
    isRecordingRef.current = false;
    setIsRecording(false);
    try { recognitionRef.current?.stop(); } catch { /* noop */ }
  }, []);

  const startRecording = useCallback(() => {
    const SpeechAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechAPI) {
      alert('Voice input is not supported in your browser. Please use Chrome or Safari.');
      return;
    }

    // v8: Stop any TTS playback immediately so the mic doesn't pick it up.
    // This is the primary fix for "empty recording right after AI message" — the
    // TTS audio was leaking into the mic buffer and iOS was transcribing it as
    // cached speech before the user even spoke.
    if (currentAudioRef.current) {
      currentAudioRef.current.onended = null;
      currentAudioRef.current.onerror = null;
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    // v10: also stop iOS Web Audio path if active
    if (currentAudioSourceRef.current) {
      currentAudioSourceRef.current.onended = null;
      try { currentAudioSourceRef.current.stop(); } catch { /* already ended */ }
      currentAudioSourceRef.current = null;
    }
    if (currentUtteranceRef.current) {
      currentUtteranceRef.current.onend = null;
      currentUtteranceRef.current.onerror = null;
      currentUtteranceRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingId(null);

    // v8: 200ms grace period — discard finals that arrive within 200ms of mic
    // start. Even after stopping TTS, iOS may have buffered a fraction of audio
    // in the mic hardware. Real speech always takes >200ms to produce a first
    // recognizable word, so this window only discards ghost results.
    // IMPORTANT: recordingStartTime lives in the OUTER scope so it is NOT reset
    // when createSession() restarts — only the first tap matters.
    const recordingStartTime = Date.now();

    // Text already in the input field is preserved as a prefix
    const prefixText = input.trim() ? input.trim() + ' ' : '';
    // Accumulates committed finals across sub-sessions
    accumulatedRef.current = '';
    isRecordingRef.current = true;
    setIsRecording(true);

    const createSession = () => {
      let subSessionFinalText = '';

      const rec = new SpeechAPI();
      recognitionRef.current = rec;
      rec.lang = 'en-US';
      rec.continuous = false;    // Stop on silence; we restart via onend
      rec.interimResults = true;

      rec.onresult = (event: any) => {
        // Guard: calling stop() causes the recognition to fire a final onresult
        // with whatever it has accumulated. By this point isRecordingRef is already
        // false (stopRecording sets it synchronously before calling stop()), so we
        // drop the result and don't overwrite the input that was just sent.
        if (!isRecordingRef.current) return;
        const elapsed = Date.now() - recordingStartTime;
        // Build final text with startsWith dedup:
        // If result[i] starts with result[i-1], it is an updated/extended version
        // of the same segment (Android incremental-cumulative behaviour) — replace
        // rather than concatenate so words don't appear twice.
        const dedupedFinals: string[] = [];
        let interim = '';

        for (let i = 0; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            if (elapsed < 200) continue; // 200ms grace: discard buffered ghost audio
            const t = event.results[i][0].transcript;
            const prev = dedupedFinals.length > 0 ? dedupedFinals[dedupedFinals.length - 1] : '';
            if (prev && t.startsWith(prev.trimEnd())) {
              dedupedFinals[dedupedFinals.length - 1] = t; // replace with more complete version
            } else {
              dedupedFinals.push(t);
            }
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        const finalText = dedupedFinals.map(t => t.trimEnd() + ' ').join('');
        subSessionFinalText = finalText;
        setInput(prefixText + accumulatedRef.current + finalText + interim);
      };

      rec.onend = () => {
        if (isRecordingRef.current) {
          // Commit this sub-session's finals to the cross-session accumulator
          accumulatedRef.current += subSessionFinalText;
          if (accumulatedRef.current && !accumulatedRef.current.endsWith(' ')) {
            accumulatedRef.current += ' ';
          }
          createSession(); // fresh instance — no old state carried over
        }
        // else: stopRecording() was called; state already updated, don't restart
      };

      rec.onerror = (event: any) => {
        if (event.error === 'no-speech' || event.error === 'aborted') {
          if (isRecordingRef.current) {
            accumulatedRef.current += subSessionFinalText;
            createSession();
          }
          return;
        }
        console.error('Speech recognition error:', event.error);
        isRecordingRef.current = false;
        setIsRecording(false);
      };

      try { rec.start(); } catch (err) {
        console.error('Failed to start recognition:', err);
        isRecordingRef.current = false;
        setIsRecording(false);
      }
    };

    createSession();
  }, [input]);

  const handleVoiceInput = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  // ── Speaker mode toggle ────────────────────────────────────────────────────
  // When turning ON, immediately plays the last bot message.
  // This click IS a user gesture, so audio.play() is allowed on all platforms.

  const handleSpeakerToggle = useCallback(() => {
    if (speakerMode) {
      stopSpeaking();
      setSpeakerMode(false);
    } else {
      setSpeakerMode(true);
      // Find the last visible bot message and play it
      const lastBot = [...messages].reverse().find(m => m.role === 'assistant' && !m.hidden);
      if (lastBot) {
        const clean = stripEmojis(lastBot.content);
        if (clean) {
          // Called directly inside a click handler → audio.play() is permitted
          speakMessage(lastBot.content, lastBot.id, session?.level, lastBot.audioUrl);
        }
      }
    }
  }, [speakerMode, messages, session, stopSpeaking, speakMessage]);

  // ── Session start ──────────────────────────────────────────────────────────

  const handleStartSession = useCallback(async (level: Level, topic: string) => {
    setIsStarting(true);
    const newSession: Session = { level, topic };

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Hello!' }],
          level, topic, isFirstMessage: true,
        }),
      });
      const data = await res.json();
      if (res.status === 429) {
        const hiddenHello: Message = { id: generateId(), role: 'user', content: 'Hello!', hidden: true };
        const limitMsg: Message = { id: generateId(), role: 'assistant', content: data.message, isLimitReached: true };
        setSession(newSession);
        setMessages([hiddenHello, limitMsg]);
        return;
      }
      if (!res.ok) throw new Error('API error');

      const hiddenHello: Message = { id: generateId(), role: 'user', content: 'Hello!', hidden: true };
      const welcome: Message = { id: generateId(), role: 'assistant', content: data.message };
      setSession(newSession);
      setMessages([hiddenHello, welcome]);

      // Pre-fetch OpenAI audio; autoPlay=true means it also plays when ready
      // (speaking mode). Falls back to browser TTS only if fetch fails.
      preloadAudio(welcome.id, data.message, level, speakerMode);
    } catch {
      const topicLabel = topic.toLowerCase() === 'general' ? 'all sorts of interesting things' : topic;
      const fallback: Message = {
        id: generateId(), role: 'assistant',
        content: `Hi there! 👋 I'm Alex, your English practice partner! So excited to chat with you about ${topicLabel}! What do you already know about this topic?`,
      };
      setSession(newSession);
      setMessages([{ id: generateId(), role: 'user', content: 'Hello!', hidden: true }, fallback]);

      preloadAudio(fallback.id, fallback.content, level, speakerMode);
    } finally {
      setIsStarting(false);
    }
  }, [speakerMode, preloadAudio]);

  // ── Send message ───────────────────────────────────────────────────────────

  const sendMessage = useCallback(async (
    userText: string, currentMessages: Message[], sessionData: Session
  ) => {
    if (!userText.trim() || isLoading) return;

    const userMsg: Message = { id: generateId(), role: 'user', content: userText.trim() };
    const newMessages = [...currentMessages, userMsg];
    setMessages(newMessages);
    setInput('');
    accumulatedRef.current = '';
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          level: sessionData.level, topic: sessionData.topic, isFirstMessage: false,
        }),
      });
      const data = await res.json();
      if (res.status === 429) {
        setMessages(prev => [...prev, {
          id: generateId(), role: 'assistant', content: data.message, isLimitReached: true,
        }]);
        return;
      }
      if (!res.ok) throw new Error('API error');

      const botMsg: Message = { id: generateId(), role: 'assistant', content: data.message };
      setMessages(prev => [...prev, botMsg]);

      // Pre-fetch OpenAI audio in background.
      // autoPlay=speakerMode: plays the OpenAI voice once the blob is ready.
      // Falls back to browser TTS only if the TTS fetch fails.
      preloadAudio(botMsg.id, data.message, sessionData.level, speakerMode);
    } catch {
      setMessages(prev => [...prev, {
        id: generateId(), role: 'assistant',
        content: "I'm sorry, I had a connection issue. Could you try again?",
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, speakerMode, preloadAudio]);

  const handleSend = useCallback(() => {
    if (!session || !input.trim() || isLoading) return;
    // Tapping Send while recording: stop mic and send in one action
    if (isRecordingRef.current) stopRecording();
    sendMessage(input, messages, session);
  }, [session, input, isLoading, messages, sendMessage, stopRecording]);

  // ── Translation ────────────────────────────────────────────────────────────

  const handleTranslate = useCallback(async (msgId: string, text: string) => {
    const msg = messages.find(m => m.id === msgId);
    if (!msg) return;
    if (msg.showTranslation) { updateMessage(msgId, { showTranslation: false }); return; }
    if (msg.translation) { updateMessage(msgId, { showTranslation: true }); return; }

    updateMessage(msgId, { isTranslating: true, showTranslation: true });
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'API error');
      updateMessage(msgId, { translation: data.translation, isTranslating: false });
    } catch (err) {
      console.error('Translate error:', err);
      updateMessage(msgId, { translation: 'Translation failed. Please try again.', isTranslating: false });
    }
  }, [messages, updateMessage]);

  // ── Grammar ────────────────────────────────────────────────────────────────

  const handleGrammar = useCallback(async (msgId: string, text: string) => {
    const msg = messages.find(m => m.id === msgId);
    if (!msg) return;
    if (msg.showCorrection) { updateMessage(msgId, { showCorrection: false }); return; }
    if (msg.correction) { updateMessage(msgId, { showCorrection: true }); return; }

    updateMessage(msgId, { isCheckingGrammar: true, showCorrection: true });
    try {
      const res = await fetch('/api/grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      updateMessage(msgId, { correction: data.corrected || 'Grammar check failed.', isCheckingGrammar: false });
    } catch {
      updateMessage(msgId, { correction: 'Grammar check failed. Please try again.', isCheckingGrammar: false });
    }
  }, [messages, updateMessage]);

  // ── New session ────────────────────────────────────────────────────────────

  const handleNewSession = useCallback(() => {
    stopSpeaking();
    stopRecording();
    accumulatedRef.current = '';
    // Revoke pre-fetched blob URLs to avoid memory leaks
    setMessages(prev => {
      prev.forEach(m => { if (m.audioUrl) URL.revokeObjectURL(m.audioUrl); });
      return [];
    });
    setSession(null);
    setInput('');
    setIsLoading(false);
  }, [stopSpeaking, stopRecording]);

  // ── Don't render on server ─────────────
  if (!mounted) return null;

  // ── Setup screen (also via portal) ────
  if (!session) {
    return createPortal(
      <SessionSetup onStart={handleStartSession} isLoading={isStarting} />,
      document.body
    );
  }

  // ─────────────────────────────────────────
  // Chat UI
  // createPortal renders directly into document.body, completely bypassing the
  // studiolingo.ge parent layout (and any CSS transforms that would break
  // position:fixed). This eliminates the Studio Lingo logo / header overlap.
  // ─────────────────────────────────────────

  const visibleMessages = messages.filter(m => !m.hidden);
  const topicDisplay = session.topic.toLowerCase() === 'general'
    ? 'General' : session.topic.charAt(0).toUpperCase() + session.topic.slice(1);

  return createPortal(
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 2147483647,
        height: chatHeight, display: 'flex', flexDirection: 'column',
        background: 'linear-gradient(180deg,#f9fafb 0%,#ffffff 100%)',
        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
      }}
    >
      {/* ── Header ── */}
      <div style={{
        flexShrink: 0,
        background: `linear-gradient(180deg, ${C.blue} 0%, ${C.blueDark} 100%)`,
        borderBottom: 'none',
        boxShadow: '0 1px 20px rgba(41,49,66,0.15)',
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 8,
      }}>
        {/* Left: level + topic */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
            <span style={{
              ...W, background: C.green, fontSize: 11, fontWeight: 700,
              padding: '3px 10px', borderRadius: 20, flexShrink: 0, letterSpacing: '0.03em',
              boxShadow: '0 1px 6px rgba(47,158,77,0.4)',
            }}>{session.level}</span>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {session.topic.toLowerCase() === 'general' ? '🌍' : '💬'} {topicDisplay}
            </span>
          </div>
        </div>

        {/* Right: speaker toggle + new session */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <button
            onClick={handleSpeakerToggle}
            title={speakerMode ? 'Speaking mode ON — tap to turn off' : 'Speaking mode OFF — tap to turn on'}
            style={{
              ...W, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
              background: speakerMode ? C.green : 'rgba(255,255,255,0.12)',
              border: 'none', borderRadius: 20, padding: '6px 12px',
              fontSize: 12, fontWeight: 600,
              boxShadow: speakerMode ? '0 2px 8px rgba(47,158,77,0.45)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            <span style={W}>{speakerMode ? <IconSpeakerOn /> : <IconSpeakerOff />}</span>
            <span style={{ ...W, display: 'none' }} className="sm-show">
              {speakerMode ? 'Speaking' : 'Muted'}
            </span>
          </button>
          <button
            onClick={handleNewSession}
            title="New session"
            style={{
              ...W, display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer',
              background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: 20,
              padding: '6px 12px', fontSize: 12, fontWeight: 600,
            }}
          >
            <span style={W}><IconRefresh /></span>
            <span style={W}>New</span>
          </button>
        </div>
      </div>

      {/* ── Messages ── */}
      <div ref={messagesContainerRef} style={{ flex: 1, overflowY: 'auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {visibleMessages.map(message => (
          <div key={message.id} style={{ display: 'flex', justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}>

            {/* Bot message */}
            {message.role === 'assistant' && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, maxWidth: 'min(88%, 520px)' }}>
                {/* AI avatar */}
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: `linear-gradient(135deg,${C.green},${C.greenDark})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 30, boxShadow: '0 2px 8px rgba(47,158,77,0.3)',
                }}>
                  <span style={{ ...W, fontSize: 10, fontWeight: 700 }}>AI</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {/* Bubble */}
                  <div style={{
                    background: C.white, padding: '12px 16px',
                    borderRadius: '20px 20px 20px 5px',
                    boxShadow: '0 2px 12px rgba(41,49,66,0.07), 0 0 0 1px rgba(41,49,66,0.05)',
                  }}>
                    <p style={{
                      color: message.isLimitReached ? '#dc2626' : C.textPrimary,
                      fontWeight: message.isLimitReached ? 600 : 400,
                      fontSize: 15, lineHeight: 1.5, margin: 0,
                      whiteSpace: 'pre-wrap', letterSpacing: '-0.01em',
                    }}>
                      {message.content}
                    </p>
                  </div>

                  {/* Translation box */}
                  {message.showTranslation && (
                    <div style={{
                      background: C.greenLight, borderRadius: 14, padding: '10px 14px',
                      borderLeft: `3px solid ${C.green}`,
                    }}>
                      {message.isTranslating ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{
                            width: 12, height: 12, borderRadius: '50%',
                            border: `2px solid ${C.green}`, borderTopColor: 'transparent',
                            animation: 'spin 0.8s linear infinite',
                          }} />
                          <span style={{ color: C.green, fontSize: 12 }}>Translating...</span>
                        </div>
                      ) : (
                        <p style={{ color: C.blue, fontSize: 14, lineHeight: 1.5, margin: 0 }}>
                          {message.translation}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Action buttons (suppressed for rate-limit notices) */}
                  {!message.isLimitReached && (
                  <div style={{ display: 'flex', gap: 6 }}>

                    {/* Listen — shows spinner while pre-fetching, instant play when ready */}
                    <button
                      onClick={() => {
                        if (playingId === message.id) {
                          stopSpeaking();
                        } else if (!message.isPreloadingAudio) {
                          // Pass the pre-fetched URL (if available) for zero-delay playback
                          speakMessage(message.content, message.id, session?.level, message.audioUrl);
                        }
                        // If still pre-loading: show spinner, wait for it to finish
                      }}
                      title={message.isPreloadingAudio ? 'Preparing audio...' : (playingId === message.id ? 'Stop' : 'Listen')}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        cursor: message.isPreloadingAudio ? 'wait' : 'pointer',
                        border: 'none', borderRadius: 20, padding: '5px 12px', fontSize: 11, fontWeight: 600,
                        ...(playingId === message.id
                          ? { ...W, background: C.green, boxShadow: '0 2px 6px rgba(47,158,77,0.3)' }
                          : { color: C.textMuted, background: '#f3f4f6' }),
                        transition: 'all 0.15s',
                      }}
                    >
                      {message.isPreloadingAudio && playingId !== message.id ? (
                        // Loading spinner while audio is being pre-fetched
                        <>
                          <div style={{
                            width: 10, height: 10, borderRadius: '50%',
                            border: `1.5px solid ${C.textMuted}`, borderTopColor: 'transparent',
                            animation: 'spin 0.8s linear infinite', flexShrink: 0,
                          }} />
                          <span style={{ color: C.textMuted }}>Loading...</span>
                        </>
                      ) : (
                        <>
                          <span style={playingId === message.id ? W : { color: C.textMuted }}>
                            {playingId === message.id ? <IconPause /> : <IconVolume />}
                          </span>
                          <span style={playingId === message.id ? W : { color: C.textMuted }}>
                            {playingId === message.id ? 'Stop' : 'Listen'}
                          </span>
                        </>
                      )}
                    </button>

                    {/* Translate (dark-blue when active) */}
                    <button
                      onClick={() => handleTranslate(message.id, message.content)}
                      style={{
                        display: 'flex', alignItems: 'center', cursor: 'pointer',
                        border: 'none', borderRadius: 20, padding: '5px 12px', fontSize: 11, fontWeight: 600,
                        ...(message.showTranslation
                          ? { ...W, background: C.blue, boxShadow: '0 2px 6px rgba(41,49,66,0.25)' }
                          : { color: C.textMuted, background: '#f3f4f6' }),
                        transition: 'all 0.15s',
                      }}
                    >
                      <span style={message.showTranslation ? W : { color: C.textMuted }}>ქარ</span>
                    </button>
                  </div>
                  )}
                </div>
              </div>
            )}

            {/* User message */}
            {message.role === 'user' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, maxWidth: 'min(88%, 520px)' }}>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '20px 20px 5px 20px',
                  background: `linear-gradient(135deg,${C.green},${C.greenDark})`,
                  boxShadow: '0 2px 12px rgba(47,158,77,0.25)',
                }}>
                  <p style={{ ...W, fontSize: 15, lineHeight: 1.5, margin: 0, whiteSpace: 'pre-wrap', letterSpacing: '-0.01em' }}>
                    {message.content}
                  </p>
                </div>

                {/* Grammar correction box */}
                {message.showCorrection && (
                  <div style={{
                    background: C.white, borderRadius: 14, padding: '10px 14px', width: '100%',
                    borderLeft: `3px solid ${C.blue}`,
                    boxShadow: '0 1px 8px rgba(41,49,66,0.06)',
                  }}>
                    {message.isCheckingGrammar ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 12, height: 12, borderRadius: '50%',
                          border: `2px solid ${C.blue}`, borderTopColor: 'transparent',
                          animation: 'spin 0.8s linear infinite',
                        }} />
                        <span style={{ color: C.textMuted, fontSize: 12 }}>Checking grammar...</span>
                      </div>
                    ) : (
                      <>
                        <p style={{ color: C.textMuted, fontSize: 11, fontWeight: 600, margin: '0 0 4px' }}>
                          💡 More natural English:
                        </p>
                        <p style={{ color: C.textPrimary, fontSize: 14, lineHeight: 1.5, margin: 0 }}>
                          {message.correction}
                        </p>
                      </>
                    )}
                  </div>
                )}

                {/* Grammar button */}
                <button
                  onClick={() => handleGrammar(message.id, message.content)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer',
                    border: 'none', borderRadius: 20, padding: '5px 12px', fontSize: 11, fontWeight: 600,
                    ...(message.showCorrection
                      ? { ...W, background: C.blue, boxShadow: '0 2px 6px rgba(41,49,66,0.25)' }
                      : { color: C.textMuted, background: '#f3f4f6' }),
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={message.showCorrection ? W : { color: C.textMuted, fontWeight: 700, fontSize: 13 }}>ℹ</span>
                  <span style={message.showCorrection ? W : { color: C.textMuted }}>Grammar</span>
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: `linear-gradient(135deg,${C.green},${C.greenDark})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(47,158,77,0.3)',
              }}>
                <span style={{ ...W, fontSize: 10, fontWeight: 700 }}>AI</span>
              </div>
              <div style={{
                background: C.white, padding: '12px 16px', borderRadius: '20px 20px 20px 5px',
                boxShadow: '0 2px 12px rgba(41,49,66,0.07)',
              }}>
                <div style={{ display: 'flex', gap: 5, alignItems: 'center', height: 16 }}>
                  {[0, 150, 300].map(delay => (
                    <div key={delay} style={{
                      width: 8, height: 8, borderRadius: '50%', background: '#d1d5db',
                      animation: `bounce 1.2s ${delay}ms ease-in-out infinite`,
                    }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Input bar ── */}
      <div style={{
        flexShrink: 0,
        background: 'rgba(255,255,255,0.95)',
        borderTop: `1px solid ${C.border}`,
        padding: '10px 16px',
        paddingBottom: 'calc(10px + env(safe-area-inset-bottom))',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 -4px 20px rgba(41,49,66,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, maxWidth: 680, margin: '0 auto' }}>
          {/* Mic — tap to start, tap to stop (does NOT auto-send on stop) */}
          <button
            onClick={handleVoiceInput}
            title={isRecording ? 'Stop recording' : 'Record voice message'}
            style={{
              flexShrink: 0, width: 44, height: 44, borderRadius: '50%', border: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
              ...(isRecording
                ? { background: '#ef4444', color: C.white, boxShadow: '0 0 0 4px rgba(239,68,68,0.2)' }
                : { background: '#f3f4f6', color: C.textMuted }),
            }}
          >
            <span style={isRecording ? W : { color: C.textMuted }}>
              {isRecording ? <IconMicStop /> : <IconMic />}
            </span>
          </button>

          {/* Text input */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => {
              setInput(e.target.value);
              if (!isRecordingRef.current) accumulatedRef.current = e.target.value;
            }}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder={isRecording ? 'Listening... tap Send to stop & send' : 'Type your message...'}
            disabled={isLoading}
            style={{
              flex: 1, height: 44, padding: '0 16px', fontSize: 16,
              border: `1.5px solid ${C.border}`, borderRadius: 22,
              background: C.white, color: C.textPrimary,
              outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s',
              opacity: isLoading ? 0.5 : 1,
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = C.green;
              e.currentTarget.style.boxShadow = `0 0 0 3px rgba(47,158,77,0.12)`;
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = C.border;
              e.currentTarget.style.boxShadow = 'none';
            }}
          />

          {/* Send — if recording: stops mic AND sends in one tap */}
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            title={isRecording ? 'Stop recording and send' : 'Send message'}
            style={{
              flexShrink: 0, width: 44, height: 44, borderRadius: '50%', border: 'none',
              cursor: !input.trim() || isLoading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `linear-gradient(135deg,${C.green},${C.greenDark})`,
              boxShadow: '0 3px 10px rgba(47,158,77,0.35)',
              opacity: !input.trim() || isLoading ? 0.4 : 1,
              transition: 'opacity 0.15s',
            }}
          >
            <span style={W}><IconSend /></span>
          </button>
        </div>

        {isRecording && (
          <p style={{ textAlign: 'center', color: '#ef4444', fontSize: 11, fontWeight: 500, marginTop: 6, marginBottom: 0 }}>
            🎤 Recording — tap Send to stop &amp; send, or tap the mic to stop &amp; review
          </p>
        )}
      </div>

      {/* Keyframe animations injected once */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bounce {
          0%,80%,100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>,
    document.body
  );
}
