'use client';

import { markVisited } from '@/lib/storage/visited';

interface WelcomeIntroProps {
  onDismiss: () => void;
}

const ELEMENTS = [
  { name: '金', borderClass: 'border-primary' },
  { name: '木', borderClass: 'border-green-700' },
  { name: '水', borderClass: 'border-blue-500' },
  { name: '火', borderClass: 'border-accent' },
  { name: '土', borderClass: 'border-amber-700' },
] as const;

export function WelcomeIntro({ onDismiss }: WelcomeIntroProps) {
  const handleStart = () => {
    markVisited();
    onDismiss();
  };

  return (
    <div className="animate-fade-in bg-background fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex max-w-[480px] flex-col items-center px-32 py-16 text-center">
        <h1
          className="animate-fade-in-up text-foreground font-serif text-[40px] font-normal tracking-tight md:text-[56px]"
          style={{ animationDelay: '100ms', opacity: 0 }}
        >
          Very Boring
        </h1>

        <p
          className="animate-fade-in-up mt-16 text-[16px] leading-relaxed text-neutral-500 md:text-[18px]"
          style={{ animationDelay: '200ms', opacity: 0 }}
        >
          抽一张牌，走一段短梦
        </p>

        <p
          className="animate-fade-in-up mt-24 text-[16px] leading-relaxed text-neutral-500"
          style={{ animationDelay: '300ms', opacity: 0 }}
        >
          从五张牌中选一张，让它带你走一段很短的故事。故事的结尾，你会收到一张皱巴巴的小纸条——上面写着一个秘密。
        </p>

        <div
          className="animate-fade-in-up mt-32 flex items-center gap-16"
          style={{ animationDelay: '400ms', opacity: 0 }}
        >
          {ELEMENTS.map((element) => (
            <div key={element.name} className="flex flex-col items-center gap-8">
              <div className={`h-16 w-16 rounded-full border-2 ${element.borderClass}`} />
              <span className="text-[13px] text-neutral-500">{element.name}</span>
            </div>
          ))}
        </div>

        <button
          className="animate-fade-in-up bg-primary duration-fast hover:bg-primary-hover active:bg-primary-active mt-48 inline-flex h-48 items-center justify-center rounded-xl px-24 text-[15px] font-medium text-white transition-colors active:scale-[0.98]"
          style={{ animationDelay: '500ms', opacity: 0 }}
          onClick={handleStart}
        >
          开始
        </button>
      </div>
    </div>
  );
}
