'use client';

import { useEffect, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { CardDraw } from '@/components/CardDraw';
import { NarrativeGame } from '@/components/NarrativeGame';
import { WelcomeIntro } from '@/components/WelcomeIntro';
import { hasVisited } from '@/lib/storage/visited';
import type { DrawnCard, NarrativePhase } from '@/lib/types';

export default function Home() {
  const [phase, setPhase] = useState<NarrativePhase>('drawing');
  const [selectedCard, setSelectedCard] = useState<DrawnCard | null>(null);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasVisited()) {
        setShowIntro(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleCardSelected = (card: DrawnCard) => {
    setSelectedCard(card);
    setPhase('intro');
  };

  return (
    <div className="flex flex-1 flex-col">
      {showIntro && <WelcomeIntro onDismiss={() => setShowIntro(false)} />}
      <Section spacing="section" className="flex flex-1 flex-col justify-center">
        <PageContainer>
          {phase === 'drawing' && <CardDraw onCardSelected={handleCardSelected} />}
          {phase !== 'drawing' && selectedCard && (
            <NarrativeGame
              card={selectedCard}
              onRestart={() => {
                setSelectedCard(null);
                setPhase('drawing');
              }}
            />
          )}
        </PageContainer>
      </Section>
    </div>
  );
}
