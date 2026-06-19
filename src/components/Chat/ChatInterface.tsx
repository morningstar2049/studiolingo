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

// Short 2-letter labels for the in-chat header badge. Display only — the
// underlying session.level stays A1–C2 for all logic (speech rate, API, etc.).
const LEVEL_BADGE: Record<Level, string> = {
  A1: 'Be', A2: 'El', B1: 'In', B2: 'Up', C1: 'Ad', C2: 'Pr',
};

// True on iPhone / iPad. Voice input is routed to record-and-transcribe on
// Apple mobile because the Web Speech API is unreliable in iOS standalone PWAs
// (the first attempt is swallowed and transcribes nothing).
const isAppleMobile = () =>
  typeof navigator !== 'undefined' &&
  (/iP(hone|ad|od)/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

// One translation request to /api/translate. Returns the Georgian text, or null
// on any failure. Shared by the background pre-translate and the on-tap handler
// so a quick tap can reuse a single in-flight request.
async function requestTranslation(text: string): Promise<string | null> {
  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data?.translation === 'string' ? data.translation : null;
  } catch {
    return null;
  }
}

// Splits a reply into sentences so speaking-mode playback can start on the
// first (short) sentence instead of waiting for the whole reply to synthesize.
// Very short trailing fragments are glued to the previous sentence so the audio
// doesn't sound choppy.
function splitSentences(text: string): string[] {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (!normalized) return [];
  const pieces = normalized.match(/[^.!?…]+[.!?…]+(?=\s|$)|[^.!?…]+$/g) || [normalized];
  const out: string[] = [];
  for (const piece of pieces) {
    const s = piece.trim();
    if (!s) continue;
    if (out.length > 0 && s.length < 15) out[out.length - 1] += ' ' + s;
    else out.push(s);
  }
  return out;
}

// Starts an inaudible, looping buffer that keeps the iOS audio session
// continuously "active" on the loudspeaker. Without this, iOS lets the session
// go idle and reverts to the quiet earpiece route after a few playbacks — which
// is why the AI's voice got softer after the 2nd–3rd message. Returns the node
// so it can be stopped (e.g. while the mic is recording).
function startSilentKeepAlive(ctx: AudioContext): AudioBufferSourceNode {
  const src = ctx.createBufferSource();
  src.buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate); // 1s of silence
  src.loop = true;
  src.connect(ctx.destination);
  src.start(0);
  return src;
}

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
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [speakerMode, setSpeakerMode] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  // Tracks the chat-container height so it can shrink above the soft keyboard
  // on iOS (where 100dvh doesn't account for the keyboard). Initial value is
  // 100dvh; switched to a pixel height as soon as visualViewport reports.
  const [chatHeight, setChatHeight] = useState<string>('100dvh');
  // Counter-transform for iOS's keyboard-driven shift of position:fixed
  // elements. When iOS opens the keyboard it offsets the visual viewport
  // (vv.offsetTop > 0) and drags the chat's top edge off-screen with it.
  // Translating the chat by +offsetTop puts it back where it belongs.
  const [chatTransform, setChatTransform] = useState<string>('none');
  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef(false);
  // v5: on iOS we accumulate final text across fresh sub-sessions
  const accumulatedRef = useRef('');
  // iOS record-and-transcribe path (see startRecordingIOS).
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const iosRecordActiveRef = useRef(false);
  // Resolver for the in-flight stop→transcribe promise (see stopAndTranscribeIOS).
  const transcribeResolveRef = useRef<((text: string) => void) | null>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  // The chat input is a contentEditable <div> (not an <input>) so that mobile
  // keyboards don't show their autofill / form-assistant accessory bars
  // (Gboard's key/card/location strip on Android, WebKit's prev/next/Done
  // bar on iOS). Because contentEditable is uncontrolled from React's
  // perspective, programmatic writes (voice recognition, send, new session)
  // must update both the React `input` state AND the DOM's innerText.
  // User typing only updates state (the DOM already has the text, and
  // overwriting innerText mid-typing would reset the cursor).
  const writeInput = useCallback((text: string) => {
    setInput(text);
    const el = inputRef.current;
    if (!el) return;
    if (text === '') {
      // Always force-clear via innerHTML so any stray <br> the browser
      // inserted while editing is removed and the :empty placeholder shows.
      if (el.innerHTML !== '') el.innerHTML = '';
    } else if (el.innerText !== text) {
      el.innerText = text;
    }
  }, []);

  // Holds the currently-playing Audio element so we can stop it
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  // Holds the active Web Speech utterance so we can silence its handlers before cancel()
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  // v8: iOS AudioContext unlock flag — true once the silent buffer has been played
  const iosAudioUnlockedRef = useRef(false);
  // v9: keep the AudioContext alive in a ref so iOS doesn't GC it and revert the
  // audio session back to earpiece/quiet mode between plays
  const audioCtxRef = useRef<AudioContext | null>(null);
  // Looping silent source that keeps the iOS audio session loud (see startSilentKeepAlive).
  const keepAliveRef = useRef<AudioBufferSourceNode | null>(null);
  // v10: tracks an AudioBufferSourceNode used for iOS auto-play (Web Audio path)
  const currentAudioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  // Bumped whenever playback should restart/stop; a running chunked-playback
  // loop aborts once its generation is no longer current (prevents overlap).
  const playGenRef = useRef(0);
  // Cancels in-flight TTS sentence fetches when playback is superseded/stopped,
  // so abandoned audio requests release their connections instead of crowding
  // out the next /api/chat request (was causing Android "connection issue").
  const ttsAbortRef = useRef<AbortController | null>(null);
  // Per-message in-flight translation request, so a tap reuses the background
  // pre-translation instead of starting a second (slower) one.
  const translationInFlightRef = useRef<Map<string, Promise<string | null>>>(new Map());
  // True once the mic has been used since the last reply, so iOS can rebuild its
  // audio context (the mic leaves it stuck on the quiet earpiece route).
  const micUsedRef = useRef(false);

  // Mount flag for portal (must be client-side)
  useEffect(() => { setMounted(true); }, []);

  // Lock document scroll while the chat is mounted.
  //
  // Why: on iOS Safari, when the input gains focus and the keyboard slides
  // up, Safari automatically scrolls the *document* to bring the focused
  // input into view. Because of a long-standing iOS bug, `position: fixed`
  // elements scroll along with the document instead of staying pinned to the
  // viewport — so the chat's top edge moves off-screen and only its bottom
  // (the input bar) remains visible at the top of the viewport.
  //
  // The canonical iOS scroll-lock fix is to pin the body itself with
  // position:fixed (overflow:hidden alone doesn't stop iOS from scrolling
  // for input focus). We save the current scrollY first and restore it on
  // unmount so navigation back to the previous page returns to the same
  // place. The chat covers the underlying page, so users never see the
  // pinned body.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      htmlOverflow: html.style.overflow,
    };
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      html.style.overflow = prev.htmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, []);

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
      // Counter iOS's keyboard-driven shift of position:fixed elements.
      // vv.offsetTop is non-zero on iOS when the visual viewport gets
      // shifted relative to the layout viewport during keyboard focus
      // scroll-into-view. Translating by that amount cancels the shift.
      setChatTransform(vv.offsetTop ? `translateY(${vv.offsetTop}px)` : 'none');
      // Defer so the new height has applied before we re-anchor scroll.
      requestAnimationFrame(() => {
        const el = messagesContainerRef.current;
        if (el) el.scrollTop = el.scrollHeight;
      });
    };
    // visualViewport.scroll fires when iOS shifts the visual viewport
    // (separately from the resize that fires when the keyboard sizing
    // changes). We need both to keep the counter-translate in lockstep.
    const onScroll = () => {
      setChatTransform(vv.offsetTop ? `translateY(${vv.offsetTop}px)` : 'none');
    };
    vv.addEventListener('resize', onResize);
    vv.addEventListener('scroll', onScroll);
    return () => {
      vv.removeEventListener('resize', onResize);
      vv.removeEventListener('scroll', onScroll);
    };
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
        // iOS only: keep the session continuously alive so it stays on the
        // loudspeaker. (Skipped elsewhere to avoid a "tab playing audio" badge.)
        if (isAppleMobile()) keepAliveRef.current = startSilentKeepAlive(ctx);
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

    const gen = ++playGenRef.current; // this call now owns playback
    ttsAbortRef.current?.abort(); // cancel in-flight chunked audio fetches
    ttsAbortRef.current = null;

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
      // A newer play/stop happened while we were fetching — drop this stale clip.
      if (playGenRef.current !== gen) return;
      const url = URL.createObjectURL(blob);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'running') {
        try { await audioCtxRef.current.resume(); } catch { /* ignore */ }
      }
      if (playGenRef.current !== gen) { URL.revokeObjectURL(url); return; }
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

  // ── Speaking-mode playback: sentence-chunked for a fast start ──────────────
  // Plays the reply one sentence at a time so the voice begins as soon as the
  // FIRST (short) sentence is synthesized, instead of waiting for the whole
  // reply. The next sentence is fetched while the current one plays. Any failure
  // degrades to the browser voice (never silence). A generation token aborts the
  // loop if a newer reply / Listen / stop supersedes it.
  const playChunked = useCallback(async (
    msgId: string, clean: string, level: Level
  ) => {
    const gen = ++playGenRef.current;

    // Cancel audio fetches from a previous (now superseded) playback so they
    // release their connections instead of competing with the chat request.
    ttsAbortRef.current?.abort();
    const abort = new AbortController();
    ttsAbortRef.current = abort;

    // Stop whatever is currently playing.
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

    const sentences = splitSentences(clean);
    if (sentences.length === 0) return;

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const aborted = () => playGenRef.current !== gen || isRecordingRef.current;

    const fetchClip = async (t: string): Promise<ArrayBuffer | null> => {
      try {
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: t, level }),
          signal: abort.signal,
        });
        if (!res.ok) return null;
        return await res.arrayBuffer();
      } catch {
        return null;
      }
    };

    setPlayingId(msgId);
    // Kick off the first sentence right away; pipeline the rest.
    let pending: Promise<ArrayBuffer | null> = fetchClip(sentences[0]);

    for (let i = 0; i < sentences.length; i++) {
      if (aborted()) { if (playGenRef.current === gen) setPlayingId(null); return; }
      const buf = await pending;
      // Prefetch the next sentence while this one plays.
      pending = i + 1 < sentences.length ? fetchClip(sentences[i + 1]) : Promise.resolve(null);
      if (aborted()) { if (playGenRef.current === gen) setPlayingId(null); return; }

      if (!buf) {
        // This sentence failed to synthesize — speak the rest with the browser voice.
        if (!isRecordingRef.current && playGenRef.current === gen) {
          speakWithBrowser(sentences.slice(i).join(' '), msgId, level);
        }
        return;
      }

      try {
        if (isIOS && audioCtxRef.current) {
          if (audioCtxRef.current.state !== 'running') await audioCtxRef.current.resume();
          if (aborted()) { if (playGenRef.current === gen) setPlayingId(null); return; }
          const audioBuffer = await audioCtxRef.current.decodeAudioData(buf.slice(0));
          if (aborted()) { if (playGenRef.current === gen) setPlayingId(null); return; }
          await new Promise<void>((resolve) => {
            const source = audioCtxRef.current!.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioCtxRef.current!.destination);
            currentAudioSourceRef.current = source;
            source.onended = () => {
              if (currentAudioSourceRef.current === source) currentAudioSourceRef.current = null;
              resolve();
            };
            source.start(0);
          });
        } else {
          if (audioCtxRef.current && audioCtxRef.current.state !== 'running') {
            try { await audioCtxRef.current.resume(); } catch { /* ignore */ }
          }
          if (aborted()) { if (playGenRef.current === gen) setPlayingId(null); return; }
          const url = URL.createObjectURL(new Blob([buf], { type: 'audio/mpeg' }));
          await new Promise<void>((resolve) => {
            const audio = new Audio(url);
            audio.volume = 1.0;
            currentAudioRef.current = audio;
            const finish = () => {
              URL.revokeObjectURL(url);
              if (currentAudioRef.current === audio) currentAudioRef.current = null;
              resolve();
            };
            audio.onended = finish;
            audio.onerror = finish;
            audio.play().catch(finish);
          });
        }
      } catch {
        currentAudioSourceRef.current = null;
        if (!isRecordingRef.current && playGenRef.current === gen) {
          speakWithBrowser(sentences.slice(i).join(' '), msgId, level);
        }
        return;
      }
    }
    if (playGenRef.current === gen) setPlayingId(null);
  }, [speakWithBrowser]);

  // ── TTS: speaking-mode auto-play + Listen-button pre-fetch ─────────────────
  // Speaking mode (autoPlay): play the reply sentence-by-sentence (playChunked)
  // so the voice starts fast. Otherwise: pre-fetch the whole clip so the Listen
  // button plays instantly later.
  const preloadAudio = useCallback(async (
    msgId: string, text: string, level: Level, autoPlay = false
  ) => {
    const clean = stripEmojis(text);
    if (!clean) return;

    if (autoPlay) {
      if (isRecordingRef.current) return; // don't talk over the user
      await playChunked(msgId, clean, level);
      return;
    }

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
      updateMessage(msgId, { audioUrl: url, isPreloadingAudio: false });
    } catch (err) {
      console.warn('TTS pre-fetch failed:', err);
      updateMessage(msgId, { isPreloadingAudio: false });
    }
  }, [updateMessage, playChunked]);

  const stopSpeaking = useCallback(() => {
    playGenRef.current++; // abort any running chunked auto-play loop
    ttsAbortRef.current?.abort(); // cancel in-flight audio fetches
    ttsAbortRef.current = null;
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
    micUsedRef.current = true; // mic used → iOS audio context needs rebuilding

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

    // One-time guard for the iOS first-attempt permission race (see onerror):
    // the very first recognition can fail while the OS is still granting access,
    // so we retry once instead of forcing the user to tap the mic again.
    let permissionRetried = false;

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
        writeInput(prefixText + accumulatedRef.current + finalText + interim);
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
        // iOS standalone PWA: the first attempt can fail with a permission /
        // service error while the OS is still granting microphone & Speech
        // Recognition access. Retry once (access is usually granted by then)
        // so a single mic tap works instead of needing a second tap.
        if (
          (event.error === 'service-not-allowed' || event.error === 'not-allowed') &&
          isRecordingRef.current &&
          !permissionRetried
        ) {
          permissionRetried = true;
          setTimeout(() => { if (isRecordingRef.current) createSession(); }, 350);
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

    // On iOS standalone PWAs the very first SpeechRecognition attempt is often
    // swallowed by the OS permission prompt and returns nothing ("first tap does
    // nothing, tap again and it works"). Granting microphone access up front via
    // getUserMedia warms the audio session so that first attempt transcribes.
    // Scoped to iOS only so the already-working Android/desktop path is untouched.
    // Best-effort: on failure we still start recognition so nothing regresses.
    const isIOS =
      typeof navigator !== 'undefined' &&
      (/iP(hone|ad|od)/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
    const md = typeof navigator !== 'undefined' ? navigator.mediaDevices : undefined;

    if (isIOS && md && typeof md.getUserMedia === 'function') {
      md.getUserMedia({ audio: true })
        .then((stream) => {
          // SpeechRecognition captures its own audio; release this stream so it
          // doesn't hold the mic or conflict with recognition on iOS.
          stream.getTracks().forEach((t) => t.stop());
          if (isRecordingRef.current) createSession();
        })
        .catch(() => {
          if (isRecordingRef.current) createSession();
        });
    } else {
      createSession();
    }
  }, [input]);

  // Re-assert the iOS "playback" (loudspeaker, full-volume) audio route. Opening
  // the mic with getUserMedia flips iOS to the quiet earpiece route and it stays
  // there after recording, making the AI's spoken reply play softly. Playing a
  // silent buffer through the kept-alive AudioContext switches it back to loud
  // playback. Harmless no-op on non-iOS browsers.
  const primeLoudspeaker = useCallback(() => {
    try {
      let ctx = audioCtxRef.current;
      if (!ctx) {
        const Ctx = (window.AudioContext ||
          (window as any).webkitAudioContext) as typeof AudioContext;
        ctx = new Ctx();
        audioCtxRef.current = ctx;
      }
      if (ctx.state !== 'running') ctx.resume().catch(() => {});
      const buf = ctx.createBuffer(1, 1, 22050);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0);
      // Make sure the silent keep-alive is running (it's stopped during recording).
      if (!keepAliveRef.current) keepAliveRef.current = startSilentKeepAlive(ctx);
      iosAudioUnlockedRef.current = true;
    } catch {
      /* non-iOS or unsupported — ignore */
    }
  }, []);

  // The reliable iOS fix: once the mic is used, the AudioContext gets stuck on
  // the quiet earpiece route for its whole life — replaying a tick on it does
  // NOT change the route. So we tear it down and build a fresh one, which routes
  // to the loudspeaker again. MUST be called inside a user gesture (e.g. the Send
  // tap) so the new context unlocks for playback.
  const recreateLoudspeakerContext = useCallback(async () => {
    try {
      stopSpeaking(); // abort any old playback loops / fetches first
      if (keepAliveRef.current) {
        try { keepAliveRef.current.stop(); } catch { /* noop */ }
        keepAliveRef.current = null;
      }
      // Fully close the old context BEFORE making a new one so iOS doesn't keep
      // a stale (earpiece-routed) context around — that accumulation is why the
      // rebuild only worked for the first message.
      const old = audioCtxRef.current;
      audioCtxRef.current = null;
      if (old && old.state !== 'closed') {
        try { await old.close(); } catch { /* already closing */ }
      }
      const Ctx = (window.AudioContext ||
        (window as any).webkitAudioContext) as typeof AudioContext;
      const ctx = new Ctx();
      audioCtxRef.current = ctx;
      try { await ctx.resume(); } catch { /* ignore */ }
      const buf = ctx.createBuffer(1, 1, 22050);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0);
      keepAliveRef.current = startSilentKeepAlive(ctx);
      iosAudioUnlockedRef.current = true;
    } catch {
      /* ignore */
    }
  }, [stopSpeaking]);

  // ── iOS voice input: record + server transcription (Whisper) ────────────────
  // The Web Speech API does not work reliably inside iOS standalone PWAs, so on
  // iPhone/iPad we record a short clip with MediaRecorder and transcribe it via
  // /api/transcribe. Non-iOS platforms keep the live Web Speech path unchanged.
  const startRecordingIOS = useCallback(async () => {
    micUsedRef.current = true; // mic used → iOS audio context needs rebuilding
    stopSpeaking(); // don't let TTS playback leak into the mic
    // Stop the silent keep-alive so the mic isn't forced into "play & record"
    // mode; primeLoudspeaker() restarts it once recording ends.
    if (keepAliveRef.current) {
      try { keepAliveRef.current.stop(); } catch { /* already stopped */ }
      keepAliveRef.current = null;
    }

    iosRecordActiveRef.current = true;
    setIsRecording(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // User may have tapped stop before the mic became ready.
      if (!iosRecordActiveRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        primeLoudspeaker();
        return;
      }
      mediaStreamRef.current = stream;
      audioChunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
        mediaStreamRef.current = null;
        // Mic released — restore loud loudspeaker playback for the AI's reply.
        primeLoudspeaker();

        const mimeType = recorder.mimeType || 'audio/mp4';
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        audioChunksRef.current = [];
        mediaRecorderRef.current = null;

        const resolve = transcribeResolveRef.current;
        transcribeResolveRef.current = null;

        if (blob.size === 0) {
          resolve?.(''); // nothing captured (e.g. instant stop)
          return;
        }

        setIsTranscribing(true);
        let text = '';
        try {
          const ext = mimeType.includes('webm')
            ? 'webm'
            : mimeType.includes('ogg')
              ? 'ogg'
              : mimeType.includes('wav')
                ? 'wav'
                : 'mp4';
          const form = new FormData();
          form.append('file', blob, `recording.${ext}`);
          const res = await fetch('/api/transcribe', { method: 'POST', body: form });
          if (res.ok) {
            const data = await res.json();
            text = (data.text || '').trim();
          }
        } catch {
          /* transcription failed — resolve empty, never crash the chat */
        } finally {
          setIsTranscribing(false);
        }
        resolve?.(text);
      };

      recorder.start();
    } catch {
      // Permission denied or mic unavailable.
      iosRecordActiveRef.current = false;
      mediaStreamRef.current = null;
      setIsRecording(false);
    }
  }, [stopSpeaking, primeLoudspeaker]);

  // Stops the iOS recorder and resolves with the transcript (or '' if nothing
  // was captured). Both the mic button and the Send button use this, so a single
  // tap can stop → transcribe → (optionally) send without a second mic press.
  const stopAndTranscribeIOS = useCallback((): Promise<string> => {
    return new Promise((resolve) => {
      iosRecordActiveRef.current = false;
      setIsRecording(false);
      const recorder = mediaRecorderRef.current;
      if (recorder && recorder.state !== 'inactive') {
        transcribeResolveRef.current = resolve;
        try {
          recorder.stop(); // → onstop transcribes, then resolves the promise
        } catch {
          transcribeResolveRef.current = null;
          resolve('');
        }
      } else {
        // Recorder never started — release any acquired stream and restore audio.
        mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
        mediaStreamRef.current = null;
        primeLoudspeaker();
        resolve('');
      }
    });
  }, [primeLoudspeaker]);

  const handleVoiceInput = useCallback(() => {
    if (isTranscribing) return; // busy transcribing the previous clip
    // NOTE: do NOT touch audio here on the mic tap — playing anything as the
    // recorder starts up can make it capture nothing on iOS. The audio "touch"
    // that keeps replies loud happens on the Send tap (handleSend).
    // ALL of iOS uses record-then-transcribe (Whisper): Apple's live Web Speech
    // recognizer drops words unpredictably on iPhone, so it isn't reliable enough
    // even in the browser. Android keeps live Web Speech (it works there).
    const useIOSPath =
      isAppleMobile() &&
      typeof MediaRecorder !== 'undefined' &&
      !!navigator.mediaDevices?.getUserMedia;
    if (useIOSPath) {
      if (isRecording) {
        // Stop and drop the transcript into the input box for review.
        stopAndTranscribeIOS().then((text) => {
          if (text) {
            const prefix = input.trim() ? input.trim() + ' ' : '';
            writeInput(prefix + text);
          }
        });
      } else {
        startRecordingIOS();
      }
    } else {
      if (isRecording) stopRecording();
      else startRecording();
    }
  }, [
    isRecording,
    isTranscribing,
    input,
    writeInput,
    startRecording,
    stopRecording,
    startRecordingIOS,
    stopAndTranscribeIOS,
  ]);

  // ── Speaker mode toggle ────────────────────────────────────────────────────
  // When turning ON, immediately plays the last bot message.
  // This click IS a user gesture, so audio.play() is allowed on all platforms.

  const handleSpeakerToggle = useCallback(() => {
    if (speakerMode) {
      stopSpeaking();
      setSpeakerMode(false);
    } else {
      setSpeakerMode(true);
      // iOS: restore the loudspeaker before playing (the mic used for voice
      // input can leave the audio session on the quiet earpiece route).
      if (isAppleMobile()) primeLoudspeaker();
      // Find the last visible bot message and play it
      const lastBot = [...messages].reverse().find(m => m.role === 'assistant' && !m.hidden);
      if (lastBot) {
        const clean = stripEmojis(lastBot.content);
        if (clean) {
          // Use the chunked player: it fetches its own audio (so it works even
          // when the message hasn't finished pre-loading) and its generation
          // token prevents stale/duplicate playback on repeated toggles.
          playChunked(lastBot.id, clean, session?.level || 'B1');
        }
      }
    }
  }, [speakerMode, messages, session, stopSpeaking, playChunked, primeLoudspeaker]);

  // ── Session start ──────────────────────────────────────────────────────────

  // Pre-translate each reply in the background, immediately, so the Georgian is
  // usually ready before the student taps "translate". The in-flight promise is
  // stored so a tap reuses the SAME request instead of starting a second one.
  const prefetchTranslation = useCallback((msgId: string, text: string) => {
    if (!text.trim() || translationInFlightRef.current.has(msgId)) return;
    const p = requestTranslation(text);
    translationInFlightRef.current.set(msgId, p);
    p.then((result) => {
      translationInFlightRef.current.delete(msgId);
      if (result) updateMessage(msgId, { translation: result });
    });
  }, [updateMessage]);

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

      // iOS: restore the loudspeaker before the reply plays — using the mic for
      // voice input can leave the audio session on the quiet earpiece route.
      if (isAppleMobile()) primeLoudspeaker();
      // Pre-fetch OpenAI audio; autoPlay=true means it also plays when ready
      // (speaking mode). Falls back to browser TTS only if fetch fails.
      preloadAudio(welcome.id, data.message, level, speakerMode);
      prefetchTranslation(welcome.id, data.message); // make translate instant
    } catch {
      const topicLabel = topic.toLowerCase() === 'general' ? 'all sorts of interesting things' : topic;
      const fallback: Message = {
        id: generateId(), role: 'assistant',
        content: `Hi there! 👋 I'm Alex, your English practice partner! So excited to chat with you about ${topicLabel}! What do you already know about this topic?`,
      };
      setSession(newSession);
      setMessages([{ id: generateId(), role: 'user', content: 'Hello!', hidden: true }, fallback]);

      if (isAppleMobile()) primeLoudspeaker();
      preloadAudio(fallback.id, fallback.content, level, speakerMode);
    } finally {
      setIsStarting(false);
    }
  }, [speakerMode, preloadAudio, primeLoudspeaker, prefetchTranslation]);

  // ── Send message ───────────────────────────────────────────────────────────

  const sendMessage = useCallback(async (
    userText: string, currentMessages: Message[], sessionData: Session
  ) => {
    if (!userText.trim() || isLoading) return;

    const userMsg: Message = { id: generateId(), role: 'user', content: userText.trim() };
    const newMessages = [...currentMessages, userMsg];
    setMessages(newMessages);
    writeInput('');
    accumulatedRef.current = '';
    setIsLoading(true);

    // Silently retry transient failures (network blips, server cold-starts /
    // 5xx) so a student never sees the "connection issue" message for a hiccup
    // that fixes itself on its own. A 429 (daily limit) is a real, intended
    // response and is NEVER retried; non-retryable client errors fail fast.
    const MAX_ATTEMPTS = 3;
    const payload = JSON.stringify({
      messages: newMessages.map(m => ({ role: m.role, content: m.content })),
      level: sessionData.level, topic: sessionData.topic, isFirstMessage: false,
    });

    try {
      for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
          });

          // Daily limit reached — intended response, show it and stop.
          if (res.status === 429) {
            const limit = await res.json();
            setMessages(prev => [...prev, {
              id: generateId(), role: 'assistant', content: limit.message, isLimitReached: true,
            }]);
            return;
          }
          // Transient server error — retry silently.
          if (res.status >= 500) throw new Error('transient');
          // Other non-OK (e.g. expired auth) won't recover on retry — fail fast.
          if (!res.ok) throw Object.assign(new Error('client'), { fatal: true });

          const data = await res.json();
          const botMsg: Message = { id: generateId(), role: 'assistant', content: data.message };
          setMessages(prev => [...prev, botMsg]);

          // iOS: restore loud playback before the reply plays. If the mic was
          // used, the audio context is pinned to the quiet earpiece route, so
          // rebuild it — by now (after the network round-trip) the mic is fully
          // released, so the fresh context routes to the loudspeaker. Otherwise
          // just re-assert on the existing context.
          if (isAppleMobile()) {
            if (micUsedRef.current) {
              micUsedRef.current = false;
              await recreateLoudspeakerContext();
            } else {
              primeLoudspeaker();
            }
          }
          // Pre-fetch OpenAI audio in background.
          // autoPlay=speakerMode: plays the OpenAI voice once the blob is ready.
          // Falls back to browser TTS only if the TTS fetch fails.
          preloadAudio(botMsg.id, data.message, sessionData.level, speakerMode);
          prefetchTranslation(botMsg.id, data.message); // make translate instant
          return;
        } catch (err) {
          const fatal = (err as { fatal?: boolean })?.fatal === true;
          if (fatal || attempt === MAX_ATTEMPTS) {
            setMessages(prev => [...prev, {
              id: generateId(), role: 'assistant',
              content: "I'm sorry, I had a connection issue. Could you try again?",
            }]);
            return;
          }
          // Brief backoff (0.6s, then 1.2s) before the next silent attempt.
          await new Promise(r => setTimeout(r, attempt * 600));
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, speakerMode, preloadAudio, writeInput, primeLoudspeaker, prefetchTranslation, recreateLoudspeakerContext]);

  const handleSend = useCallback(() => {
    if (isTranscribing) return; // wait for an in-flight transcription to finish

    // iOS: refresh the audio activation in THIS Send gesture (the words are
    // already captured by now, so this can't disturb recognition). It's what
    // lets the reply-time context rebuild route to the loudspeaker on every
    // message. micUsedRef is left set so sendMessage still does the rebuild.
    if (isAppleMobile() && micUsedRef.current) primeLoudspeaker();

    // iOS: tapping Send while recording stops the recorder, transcribes, and
    // sends in one action — no need to tap the mic a second time to stop first.
    if (iosRecordActiveRef.current) {
      stopAndTranscribeIOS().then((text) => {
        const prefix = input.trim() ? input.trim() + ' ' : '';
        const full = (prefix + text).trim();
        if (full && session && !isLoading) {
          sendMessage(full, messages, session);
        }
      });
      return;
    }

    if (!session || !input.trim() || isLoading) return;
    // Non-iOS: tapping Send while (Web Speech) recording stops the mic and sends.
    if (isRecordingRef.current) stopRecording();
    sendMessage(input, messages, session);
  }, [
    session,
    input,
    isLoading,
    messages,
    sendMessage,
    stopRecording,
    isTranscribing,
    stopAndTranscribeIOS,
    primeLoudspeaker,
  ]);

  // ── Translation ────────────────────────────────────────────────────────────

  const handleTranslate = useCallback(async (msgId: string, text: string) => {
    const msg = messages.find(m => m.id === msgId);
    if (!msg) return;
    if (msg.showTranslation) { updateMessage(msgId, { showTranslation: false }); return; }
    if (msg.translation) { updateMessage(msgId, { showTranslation: true }); return; } // instant (pre-translated)

    // Not cached yet — show a spinner and reuse the in-flight background
    // pre-translation if there is one, rather than starting a second request.
    updateMessage(msgId, { isTranslating: true, showTranslation: true });
    const inFlight = translationInFlightRef.current.get(msgId);
    const result = inFlight ? await inFlight : await requestTranslation(text);
    updateMessage(msgId, {
      translation: result || 'Translation failed. Please try again.',
      isTranslating: false,
    });
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
    writeInput('');
    setIsLoading(false);
  }, [stopSpeaking, stopRecording, writeInput]);

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
        // Top/left/right only (NO `bottom: 0`). On iOS Safari, having both
        // `bottom: 0` and an explicit `height` anchors the element to the
        // layout-viewport bottom — which sits behind the keyboard — and pushes
        // the chat's top edge off-screen above. With only `top: 0` + `height`,
        // the chat starts at the screen top and grows downward, so it sits
        // exactly above the keyboard once chatHeight tracks visualViewport.
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 2147483647,
        height: chatHeight,
        // Counter-transform iOS keyboard fixed-element shift (see useEffect).
        transform: chatTransform,
        display: 'flex', flexDirection: 'column',
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
            }}>{LEVEL_BADGE[session.level]}</span>
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
            disabled={isTranscribing}
            title={
              isTranscribing
                ? 'Transcribing…'
                : isRecording
                  ? 'Stop recording'
                  : 'Record voice message'
            }
            style={{
              flexShrink: 0, width: 44, height: 44, borderRadius: '50%', border: 'none',
              cursor: isTranscribing ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
              ...(isRecording
                ? { background: '#ef4444', color: C.white, boxShadow: '0 0 0 4px rgba(239,68,68,0.2)' }
                : { background: '#f3f4f6', color: C.textMuted }),
            }}
          >
            {isTranscribing ? (
              <span
                style={{
                  width: 18, height: 18, borderRadius: '50%',
                  border: `2px solid ${C.textMuted}`, borderTopColor: 'transparent',
                  display: 'inline-block', animation: 'spin 0.8s linear infinite',
                }}
              />
            ) : (
              <span style={isRecording ? W : { color: C.textMuted }}>
                {isRecording ? <IconMicStop /> : <IconMic />}
              </span>
            )}
          </button>

          {/* Text input — contentEditable <div> (not <input>) so mobile
              keyboards don't show their autofill / form-assistant accessory
              bars. The div has no React children (text is browser-managed
              on user input, and programmatically managed via writeInput on
              voice / send / new-session) — this is what keeps cursor stable
              while typing. data-chat-placeholder + CSS in the <style> block
              below renders the placeholder when the div is empty. */}
          <div
            ref={inputRef}
            contentEditable={!isLoading}
            suppressContentEditableWarning
            aria-label="Type your message"
            data-chat-placeholder={
              isTranscribing
                ? 'Transcribing…'
                : isRecording
                  ? (isAppleMobile() ? 'Recording… tap Send when done' : 'Listening... tap Send to stop & send')
                  : 'Type your message...'
            }
            onInput={e => {
              const el = e.currentTarget as HTMLDivElement;
              const text = el.innerText;
              setInput(text);
              if (!isRecordingRef.current) accumulatedRef.current = text;
              // Safari leaves a stray <br> after the user deletes everything,
              // which would defeat the :empty placeholder rule. Clear it.
              if ((text === '' || text === '\n') && el.innerHTML !== '') {
                el.innerHTML = '';
              }
            }}
            onKeyDown={e => {
              // Always preventDefault on Enter so the contentEditable never
              // inserts a newline (matches the original <input> being a
              // single-line field). Plain Enter sends; Shift+Enter is
              // swallowed. isComposing guard prevents sending while an IME
              // (Georgian/CJK composition) is selecting a candidate.
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                e.preventDefault();
                if (!e.shiftKey) handleSend();
              }
            }}
            onPaste={e => {
              // Force plain-text paste so no HTML / formatting leaks into the
              // contenteditable (matches <input> behaviour).
              e.preventDefault();
              const text = e.clipboardData.getData('text/plain');
              if (text) document.execCommand('insertText', false, text);
            }}
            style={{
              flex: 1, minHeight: 44, maxHeight: 120, padding: '11px 16px',
              fontSize: 16, lineHeight: '20px',
              border: `1.5px solid ${C.border}`, borderRadius: 22,
              background: C.white, color: C.textPrimary,
              outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s',
              opacity: isLoading ? 0.5 : 1,
              overflowY: 'auto',
              whiteSpace: 'pre-wrap', wordBreak: 'break-word',
              cursor: isLoading ? 'not-allowed' : 'text',
              WebkitUserSelect: 'text', userSelect: 'text',
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

          {/* Send — if recording: stops mic AND sends in one tap. Enabled while
              recording even though the input is still empty (the transcript
              isn't in the box yet), so a single Send tap can finish a voice
              message. Disabled during transcription and while a reply loads. */}
          <button
            onClick={handleSend}
            disabled={(!input.trim() && !isRecording) || isTranscribing || isLoading}
            title={isRecording ? 'Stop recording and send' : 'Send message'}
            style={{
              flexShrink: 0, width: 44, height: 44, borderRadius: '50%', border: 'none',
              cursor: (!input.trim() && !isRecording) || isTranscribing || isLoading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `linear-gradient(135deg,${C.green},${C.greenDark})`,
              boxShadow: '0 3px 10px rgba(47,158,77,0.35)',
              opacity: (!input.trim() && !isRecording) || isTranscribing || isLoading ? 0.4 : 1,
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

      {/* Keyframe animations + placeholder for the contentEditable input */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bounce {
          0%,80%,100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        /* Placeholder for the contentEditable chat input: shown only while
           the div is empty (no text and no stray <br>). */
        [data-chat-placeholder]:empty::before {
          content: attr(data-chat-placeholder);
          color: #6b7280;
          pointer-events: none;
        }
      `}</style>
    </div>,
    document.body
  );
}
