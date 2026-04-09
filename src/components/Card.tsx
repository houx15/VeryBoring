'use client';

import { useState } from 'react';
import { getElementConfig } from '@/lib/symbols';
import { SYMBOL_SVG_MAP } from '@/lib/symbols/svg-patterns';
import type { SymbolDefinition } from '@/lib/types';

interface CardProps {
  symbol: SymbolDefinition;
  position: number;
  isRevealed: boolean;
  isSelected: boolean;
  isDiscarded: boolean;
  revealDelay: number;
  onSelect: (position: number) => void;
}

export function Card({
  symbol,
  position,
  isRevealed,
  isSelected,
  isDiscarded,
  revealDelay,
  onSelect,
}: CardProps) {
  const [hasAppeared, setHasAppeared] = useState(false);
  const elementConfig = getElementConfig(symbol.element);
  const SymbolSVG = SYMBOL_SVG_MAP[symbol.id];

  const handleClick = () => {
    if (!isRevealed || isSelected || isDiscarded) return;
    onSelect(position);
  };

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.animationName === 'card-appear') {
      setHasAppeared(true);
    }
  };

  const animationStyle: React.CSSProperties = isRevealed
    ? { animationDelay: `${revealDelay}ms` }
    : {};

  const getStateClasses = (): string => {
    if (isDiscarded) {
      return 'animate-card-discard opacity-20 scale-90';
    }
    if (isSelected) {
      return 'animate-card-select-glow scale-110 z-10';
    }
    if (isRevealed) {
      if (!hasAppeared) {
        return 'animate-card-appear cursor-pointer hover:-translate-y-8 hover:shadow-warm-lg';
      }
      return 'animate-card-float cursor-pointer hover:-translate-y-8 hover:shadow-warm-lg';
    }
    return 'card-pattern';
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
      disabled={!isRevealed || isSelected || isDiscarded}
      className={`relative flex h-[140px] w-[100px] flex-col items-center justify-center rounded-xl border-2 bg-[#faf8f4] transition-all duration-300 md:h-[168px] md:w-[120px] ${getStateClasses()} `}
      style={{
        borderColor: isRevealed ? elementConfig.borderColor : 'transparent',
        boxShadow: isRevealed
          ? '0 4px 14px 0 rgba(122, 123, 92, 0.15)'
          : '0 2px 8px 0 rgba(0, 0, 0, 0.1)',
        ...animationStyle,
      }}
      aria-label={`选择卡牌：${symbol.name}`}
    >
      {isRevealed && SymbolSVG && (
        <>
          <div className="flex flex-1 items-center justify-center">
            <SymbolSVG size={60} color={elementConfig.borderColor} />
          </div>
          <div className="pt-8 pb-16">
            <span
              className="font-serif text-[20px] text-neutral-600"
              style={{ color: elementConfig.borderColor }}
            >
              {symbol.name}
            </span>
          </div>
        </>
      )}
    </button>
  );
}
