'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'sm';
  loading?: boolean;
  children: React.ReactNode;
}

const VARIANT_CLASSES = {
  primary:
    'bg-[#6B705C] text-white hover:bg-[#585c4f] active:bg-[#4a4d42] disabled:bg-neutral-300',
  secondary:
    'bg-transparent border border-neutral-300 text-foreground hover:border-neutral-400 hover:bg-neutral-50 active:bg-neutral-100 disabled:opacity-50',
  ghost:
    'bg-transparent text-foreground hover:bg-neutral-100 active:bg-neutral-200 disabled:opacity-50',
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
      className={`
        inline-flex items-center justify-center
        rounded-lg
        font-medium
        transition-all duration-fast ease-smooth
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        disabled:cursor-not-allowed
        ${VARIANT_CLASSES[variant]}
        ${SIZE_CLASSES[size]}
        ${className}
      `}
      disabled={isDisabled}
      {...rest}
    >
      {loading ? (
        <span className="flex items-center gap-8">
          <span className="w-16 h-16 border-2 border-current border-t-transparent rounded-full animate-spin" />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
