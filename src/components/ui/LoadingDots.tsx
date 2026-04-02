'use client';

import { useState, useEffect } from 'react';
import { Icon } from './Icon';

const ACTIVITY_ICONS = [
  'Utensils',
  'Dumbbell',
  'BookOpen',
  'Compass',
  'Palette',
  'Music',
  'Coffee',
  'Bike',
  'Footprints',
  'Sun',
  'Moon',
  'Sparkles',
] as const;

interface LoadingDotsProps {
  text?: string;
}

export function LoadingDots({ text = '想一个不错的...' }: LoadingDotsProps) {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [patternOffset, setPatternOffset] = useState(0);

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % ACTIVITY_ICONS.length);
    }, 250);

    const patternInterval = setInterval(() => {
      setPatternOffset((prev) => prev + 1);
    }, 300);

    return () => {
      clearInterval(iconInterval);
      clearInterval(patternInterval);
    };
  }, []);

  const patternStyle = {
    backgroundImage: `
      repeating-linear-gradient(
        ${45 + patternOffset * 5}deg,
        transparent,
        transparent 10px,
        rgba(255, 255, 255, 0.12) 10px,
        rgba(255, 255, 255, 0.12) 12px
      ),
      repeating-linear-gradient(
        ${-45 + patternOffset * 5}deg,
        transparent,
        transparent 10px,
        rgba(255, 255, 255, 0.08) 10px,
        rgba(255, 255, 255, 0.08) 12px
      )
    `,
    backgroundSize: '28px 28px',
    transition: 'background-image 150ms ease-out',
  };

  return (
    <div className="flex flex-col items-center gap-32">
      <div className="perspective-1000 relative" style={{ width: '180px', height: '240px' }}>
        <div
          className="preserve-3d absolute inset-0 backface-hidden"
          style={{
            animation: 'card-shuffle 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite',
          }}
        >
          <div
            className="shadow-warm-lg absolute inset-0 overflow-hidden rounded-2xl"
            style={{
              backgroundColor: '#7A7B5C',
              ...patternStyle,
            }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                animation: 'card-shuffle-jump 300ms cubic-bezier(0.34, 1.56, 0.64, 1) infinite',
              }}
            >
              <div
                key={currentIconIndex}
                className="flex items-center justify-center"
                style={{
                  animation: 'icon-flash 200ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                }}
              >
                <Icon
                  name={ACTIVITY_ICONS[currentIconIndex]}
                  size={64}
                  className="text-white/90"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            <div className="pointer-events-none absolute inset-2 rounded-xl border border-white/10" />

            <div className="absolute right-0 bottom-12 left-0 flex justify-center gap-6">
              {ACTIVITY_ICONS.map((_, idx) => (
                <div
                  key={idx}
                  className="h-4 w-4 rounded-full transition-all duration-200"
                  style={{
                    backgroundColor:
                      idx === currentIconIndex ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)',
                    transform: idx === currentIconIndex ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className="absolute -bottom-4 left-1/2 h-8 w-[60%] -translate-x-1/2 rounded-full opacity-30 blur-xl"
          style={{
            backgroundColor: '#7A7B5C',
            animation: 'card-shuffle-jump 300ms cubic-bezier(0.34, 1.56, 0.64, 1) infinite reverse',
          }}
        />
      </div>

      {text && (
        <span
          className="text-sm font-medium tracking-wide text-neutral-500"
          style={{
            animation: 'pulse-soft 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
}
