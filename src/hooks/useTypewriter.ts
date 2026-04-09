'use client';

import { useEffect, useState } from 'react';

interface UseTypewriterOptions {
  speed?: number;
}

interface UseTypewriterReturn {
  displayedText: string;
  isComplete: boolean;
}

export function useTypewriter(
  text: string,
  options: UseTypewriterOptions = {},
): UseTypewriterReturn {
  const { speed = 45 } = options;
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex >= text.length) return undefined;
    const timer = setTimeout(() => {
      setCharIndex((i) => i + 1);
    }, speed);
    return () => clearTimeout(timer);
  }, [charIndex, text, speed]);

  const displayedText = text.slice(0, charIndex);
  const isComplete = charIndex >= text.length && text.length > 0;

  return { displayedText, isComplete };
}
