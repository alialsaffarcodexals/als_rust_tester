import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * useTts — text-to-speech narration over an array of sentences, with
 * audiobook-style controls and a (estimated) seekable timeline.
 *
 * The Web Speech API streams speech and exposes no real duration or seeking, so
 * we speak one sentence per utterance: this gives precise highlighting (we
 * always know the active sentence), reliable seeking/scrubbing (jump to a
 * sentence), and avoids Chrome's ~15s long-utterance cut-off. The timeline is
 * *estimated* from word counts and the playback rate, and re-synced to the true
 * sentence boundary every time a sentence starts, so drift stays within one
 * sentence.
 */

export type TtsStatus = 'idle' | 'playing' | 'paused';

const WORDS_PER_MINUTE = 170;
const SENTENCE_GAP_S = 0.25;

function baseDuration(sentence: string): number {
  const words = sentence.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(0.9, (words * 60) / WORDS_PER_MINUTE) + SENTENCE_GAP_S;
}

export interface UseTts {
  supported: boolean;
  status: TtsStatus;
  index: number;            // active sentence (for highlighting)
  count: number;
  currentTime: number;      // estimated seconds
  duration: number;         // estimated seconds
  rate: number;
  volume: number;
  muted: boolean;
  play: () => void;
  pause: () => void;
  stop: () => void;
  restart: () => void;
  seekBy: (seconds: number) => void;
  seekToTime: (seconds: number) => void;
  setRate: (rate: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

export function useTts(sentences: string[]): UseTts {
  const supported =
    typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

  const [status, setStatus] = useState<TtsStatus>('idle');
  const [index, setIndex] = useState(0);
  const [now, setNow] = useState(0);
  const [rate, setRateState] = useState(1);
  const [volume, setVolumeState] = useState(1);
  const [muted, setMuted] = useState(false);

  // Estimated timeline, recomputed when the text or rate changes.
  const base = useMemo(() => sentences.map(baseDuration), [sentences]);
  const dur = useMemo(() => base.map((d) => d / rate), [base, rate]);
  const cum = useMemo(() => {
    const c: number[] = [];
    let s = 0;
    for (const d of dur) { c.push(s); s += d; }
    return c;
  }, [dur]);
  const duration = useMemo(() => dur.reduce((a, b) => a + b, 0), [dur]);

  // Refs mirror state so the speech callbacks (created once per utterance) read
  // live values without going stale.
  const statusRef = useRef(status);
  const indexRef = useRef(0);
  const rateRef = useRef(rate);
  const volRef = useRef(volume);
  const mutedRef = useRef(muted);
  const tokenRef = useRef(0);            // invalidates onend of superseded/cancelled utterances
  const sentenceStartRef = useRef(0);    // performance.now() when the active sentence began
  const pausedAtRef = useRef(0);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const cumRef = useRef(cum);
  const durRef = useRef(dur);
  const sentencesRef = useRef(sentences);

  useEffect(() => { statusRef.current = status; }, [status]);
  useEffect(() => { rateRef.current = rate; }, [rate]);
  useEffect(() => { volRef.current = volume; }, [volume]);
  useEffect(() => { mutedRef.current = muted; }, [muted]);
  useEffect(() => { cumRef.current = cum; durRef.current = dur; }, [cum, dur]);
  useEffect(() => { sentencesRef.current = sentences; }, [sentences]);

  // Choose a voice once the (async) voice list is available.
  useEffect(() => {
    if (!supported) return;
    const pick = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      voiceRef.current =
        voices.find((v) => /^en[-_]US/i.test(v.lang) && /google|samantha|natural|aria|jenny/i.test(v.name)) ||
        voices.find((v) => /^en/i.test(v.lang)) ||
        voices[0];
    };
    pick();
    window.speechSynthesis.addEventListener?.('voiceschanged', pick);
    return () => window.speechSynthesis.removeEventListener?.('voiceschanged', pick);
  }, [supported]);

  const speak = useCallback(
    (i: number) => {
      if (!supported) return;
      const list = sentencesRef.current;
      if (i < 0 || i >= list.length) return;
      const token = ++tokenRef.current;
      window.speechSynthesis.cancel(); // clear the queue / any paused utterance

      const u = new SpeechSynthesisUtterance(list[i]);
      if (voiceRef.current) u.voice = voiceRef.current;
      u.rate = rateRef.current;
      u.pitch = 1;
      u.volume = mutedRef.current ? 0 : volRef.current;
      u.onstart = () => {
        if (tokenRef.current !== token) return;
        sentenceStartRef.current = performance.now();
      };
      u.onend = () => {
        if (tokenRef.current !== token) return; // superseded by a newer utterance / cancel
        const next = i + 1;
        if (next < list.length) {
          setIndex(next);
          indexRef.current = next;
          speak(next);
        } else {
          tokenRef.current++;
          setStatus('idle');
          statusRef.current = 'idle';
          setIndex(0);
          indexRef.current = 0;
          setNow(0);
        }
      };

      setIndex(i);
      indexRef.current = i;
      setStatus('playing');
      statusRef.current = 'playing';
      sentenceStartRef.current = performance.now();
      window.speechSynthesis.speak(u);
    },
    [supported]
  );

  // Smoothly interpolate the timeline within the active sentence; snaps to the
  // true cumulative time at each sentence boundary (onstart resets the clock).
  useEffect(() => {
    if (status !== 'playing') return;
    let raf = 0;
    const loop = () => {
      const i = indexRef.current;
      const within = (performance.now() - sentenceStartRef.current) / 1000;
      const t = (cumRef.current[i] ?? 0) + Math.min(Math.max(within, 0), durRef.current[i] ?? 0);
      setNow(Math.min(t, duration));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [status, duration]);

  const play = useCallback(() => {
    if (!supported) return;
    if (statusRef.current === 'paused') {
      sentenceStartRef.current += performance.now() - pausedAtRef.current;
      window.speechSynthesis.resume();
      setStatus('playing');
      statusRef.current = 'playing';
      return;
    }
    if (statusRef.current === 'playing') return;
    speak(indexRef.current);
  }, [supported, speak]);

  const pause = useCallback(() => {
    if (!supported || statusRef.current !== 'playing') return;
    pausedAtRef.current = performance.now();
    window.speechSynthesis.pause();
    setStatus('paused');
    statusRef.current = 'paused';
  }, [supported]);

  const stop = useCallback(() => {
    if (!supported) return;
    tokenRef.current++;
    window.speechSynthesis.cancel();
    setStatus('idle');
    statusRef.current = 'idle';
    setIndex(0);
    indexRef.current = 0;
    setNow(0);
  }, [supported]);

  const restart = useCallback(() => {
    if (!supported) return;
    speak(0);
  }, [supported, speak]);

  const seekToIndex = useCallback(
    (i: number) => {
      const c = Math.max(0, Math.min(i, sentencesRef.current.length - 1));
      if (statusRef.current === 'playing') {
        speak(c);
      } else {
        tokenRef.current++;
        if (supported) window.speechSynthesis.cancel();
        setStatus('idle');
        statusRef.current = 'idle';
        setIndex(c);
        indexRef.current = c;
        setNow(cumRef.current[c] ?? 0);
      }
    },
    [supported, speak]
  );

  const indexForTime = useCallback((t: number) => {
    const c = cumRef.current;
    const d = durRef.current;
    for (let i = 0; i < c.length; i++) {
      if (t < c[i] + d[i]) return i;
    }
    return Math.max(0, c.length - 1);
  }, []);

  const seekToTime = useCallback((t: number) => seekToIndex(indexForTime(t)), [seekToIndex, indexForTime]);
  const seekBy = useCallback(
    (delta: number) => seekToTime(Math.max(0, Math.min(now + delta, duration))),
    [seekToTime, now, duration]
  );

  const setRate = useCallback(
    (r: number) => {
      setRateState(r);
      rateRef.current = r;
      if (statusRef.current === 'playing') speak(indexRef.current); // apply immediately
    },
    [speak]
  );

  // Volume applies to subsequent sentences (an in-flight utterance's volume is
  // fixed); a mute toggle re-speaks the current sentence so it takes effect now.
  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    volRef.current = v;
    if (muted && v > 0) { setMuted(false); mutedRef.current = false; }
  }, [muted]);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const nm = !m;
      mutedRef.current = nm;
      if (statusRef.current === 'playing') speak(indexRef.current);
      return nm;
    });
  }, [speak]);

  // Reset when the narration text changes (navigating to another exercise).
  useEffect(() => {
    return () => {
      tokenRef.current++;
      if (supported) window.speechSynthesis.cancel();
    };
  }, [supported, sentences]);

  return {
    supported,
    status,
    index,
    count: sentences.length,
    currentTime: now,
    duration,
    rate,
    volume,
    muted,
    play,
    pause,
    stop,
    restart,
    seekBy,
    seekToTime,
    setRate,
    setVolume,
    toggleMute,
  };
}
