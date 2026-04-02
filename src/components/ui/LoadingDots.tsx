'use client';

interface LoadingDotsProps {
  text?: string;
}

export function LoadingDots({ text = '想一下...' }: LoadingDotsProps) {
  return (
    <div className="flex flex-col items-center gap-16">
      <div className="flex items-center gap-8">
        <span
          className="w-8 h-8 rounded-full bg-primary animate-loading-dot"
          style={{ animationDelay: '0ms' }}
        />
        <span
          className="w-8 h-8 rounded-full bg-primary animate-loading-dot"
          style={{ animationDelay: '150ms' }}
        />
        <span
          className="w-8 h-8 rounded-full bg-primary animate-loading-dot"
          style={{ animationDelay: '300ms' }}
        />
      </div>
      {text && <span className="text-sm text-neutral-500">{text}</span>}
    </div>
  );
}
