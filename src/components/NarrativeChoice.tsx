'use client';

import type { NarrativeOption } from '@/lib/types';

interface NarrativeChoiceProps {
  options: NarrativeOption[];
  onChoose: (option: NarrativeOption) => void;
  disabled?: boolean;
}

export function NarrativeChoice({ options, onChoose, disabled }: NarrativeChoiceProps) {
  return (
    <div className="mx-auto mt-32 flex max-w-[480px] flex-col gap-16 px-16 md:flex-row md:px-0">
      {options.map((option, index) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChoose(option)}
          disabled={disabled}
          className="animate-choice-appear w-full rounded-xl border border-neutral-200 bg-white px-24 py-16 text-[15px] leading-relaxed text-neutral-700 transition-all duration-200 hover:border-neutral-300 hover:shadow-sm active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
}
