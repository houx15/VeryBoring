'use client';

import { useEffect, useState } from 'react';
import { drawCards } from '@/lib/symbols';
import type { DrawnCard } from '@/lib/types';
import { Card } from './Card';

interface CardDrawProps {
  onCardSelected: (card: DrawnCard) => void;
}

const REVEAL_DELAY = 150;
const SELECTION_DELAY = 600;

export function CardDraw({ onCardSelected }: CardDrawProps) {
  const [cards] = useState<DrawnCard[]>(() => drawCards());
  const [revealedCount, setRevealedCount] = useState(0);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

  useEffect(() => {
    if (cards.length === 0) return;

    const timeouts: NodeJS.Timeout[] = [];

    cards.forEach((_, index) => {
      const timeout = setTimeout(
        () => {
          setRevealedCount((prev) => prev + 1);
        },
        REVEAL_DELAY * (index + 1),
      );
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [cards]);

  const handleCardSelect = (position: number) => {
    if (selectedPosition !== null) return;

    setSelectedPosition(position);

    setTimeout(() => {
      const selectedCard = cards.find((card) => card.position === position);
      if (selectedCard) {
        onCardSelected(selectedCard);
      }
    }, SELECTION_DELAY);
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <div className="mb-32 text-center">
        <h1 className="text-foreground font-serif text-[40px] font-normal tracking-tight md:text-[56px]">
          Very Boring
        </h1>
        <p className="mt-16 text-[16px] leading-relaxed text-neutral-500 md:text-[18px]">
          感到无聊？来抽张牌玩个游戏吧
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-16 md:gap-24">
        {cards.map((card, index) => (
          <Card
            key={card.position}
            symbol={card.symbol}
            position={card.position}
            isRevealed={index < revealedCount}
            isSelected={selectedPosition === card.position}
            isDiscarded={selectedPosition !== null && selectedPosition !== card.position}
            revealDelay={index * REVEAL_DELAY}
            onSelect={handleCardSelect}
          />
        ))}
      </div>
    </div>
  );
}
