'use client';
import { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  value: number;
  from?: number;
  duration?: number; // ms
  className?: string;
  prefix?: string;
  suffix?: string;
}

// Hydration-safe animated counter. On the server and first client render it shows
// the final value; after mount it animates from `from` to `value`.
export function CountUp({ value = 0, from = 0, duration = 700, className, prefix = '', suffix = '' }: CountUpProps) {
  const [display, setDisplay] = useState<number>(value);
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const start = performance.now();
    const startVal = from;
    const endVal = value;
    const dur = Math.max(1, duration);

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / dur);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(startVal + (endVal - startVal) * eased);
      setDisplay(current);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    setDisplay(startVal);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, value, from, duration]);

  return (
    <span className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
