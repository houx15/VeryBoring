'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'sm';
  loading?: boolean;
  children: React.ReactNode;
}

const VARIANT_CLASSES = {
  primary: [
    'bg-[#7A7B5C] text-white',
    'hover:bg-[#6B6C4F] hover:shadow-[0_4px_14px_0_rgba(122,123,92,0.25)]',
    'active:bg-[#5C5D42] active:scale-[0.98] active:shadow-[0_2px_8px_0_rgba(122,123,92,0.2)]',
    'disabled:bg-neutral-300 disabled:shadow-none disabled:scale-100',
  ].join(' '),
  secondary: [
    'bg-transparent border border-neutral-300 text-foreground',
    'hover:border-[#7A7B5C] hover:bg-neutral-50 hover:shadow-[0_2px_8px_0_rgba(26,26,26,0.06)]',
    'active:bg-neutral-100 active:scale-[0.98] active:border-[#6B6C4F]',
    'disabled:opacity-50 disabled:shadow-none disabled:scale-100',
  ].join(' '),
  ghost: [
    'bg-transparent text-foreground',
    'hover:bg-neutral-100',
    'active:bg-neutral-200 active:scale-[0.98]',
    'disabled:opacity-50 disabled:scale-100',
  ].join(' '),
} as const;

const SIZE_CLASSES = {
  default: 'h-48 px-24 text-body',
  sm: 'h-40 px-16 text-sm',
} as const;

export function Button({
  variant = 'primary',
  size = 'default',
  loading = false,
  disabled,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={`duration-normal ease-elegant inline-flex items-center justify-center rounded-lg font-medium transition-all will-change-transform focus:ring-2 focus:ring-[#7A7B5C] focus:ring-offset-2 focus:outline-none ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className} `}
      disabled={isDisabled}
      {...rest}
    >
      {loading ? (
        <span className="flex items-center gap-8">
          <span className="relative h-16 w-16">
            <span className="absolute inset-0 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span
              className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[#C8956A] opacity-50"
              style={{ animationDuration: '800ms' }}
            />
          </span>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
