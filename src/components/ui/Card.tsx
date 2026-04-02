import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  const isClickable = !!onClick;

  return (
    <div
      className={[
        'rounded-lg bg-neutral-50 p-24',
        'border border-neutral-200',
        'shadow-[0_1px_3px_0_rgba(26,26,26,0.04)]',
        'duration-normal ease-elegant transition-all',
        isClickable
          ? [
              'cursor-pointer',
              'hover:bg-neutral-50',
              'hover:border-[#7A7B5C]/30',
              'hover:shadow-[0_4px_12px_0_rgba(26,26,26,0.08)]',
              'hover:-translate-y-[2px]',
              'active:bg-neutral-100',
              'active:translate-y-0',
              'active:shadow-[0_1px_3px_0_rgba(26,26,26,0.04)]',
            ].join(' ')
          : '',
        className,
      ].join(' ')}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {children}
    </div>
  );
}
