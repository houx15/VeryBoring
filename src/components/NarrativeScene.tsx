'use client';

import { useTypewriter } from '@/hooks/useTypewriter';

interface NarrativeSceneProps {
  text: string;
  onComplete?: () => void;
}

export function NarrativeScene({ text, onComplete }: NarrativeSceneProps) {
  return <SceneContent key={text} text={text} onComplete={onComplete} />;
}

function SceneContent({ text, onComplete }: NarrativeSceneProps) {
  const { displayedText, isComplete } = useTypewriter(text, { speed: 45 });

  return (
    <div className="animate-scene-fade-in mx-auto max-w-[480px] text-center">
      <TypewriterText
        displayedText={displayedText}
        isComplete={isComplete}
        onComplete={onComplete}
      />
    </div>
  );
}

function TypewriterText({
  displayedText,
  isComplete,
  onComplete,
}: {
  displayedText: string;
  isComplete: boolean;
  onComplete?: () => void;
}) {
  if (isComplete) {
    onComplete?.();
  }

  return (
    <p className="font-serif text-[18px] leading-[1.8] text-neutral-700 md:text-[20px]">
      {displayedText}
      {!isComplete && (
        <span className="animate-cursor-blink ml-1 inline-block h-[18px] w-[2px] bg-neutral-400 align-middle md:h-[20px]" />
      )}
    </p>
  );
}
