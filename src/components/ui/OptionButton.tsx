'use client';

import { Icon } from './Icon';

interface OptionButtonProps {
  label: string;
  icon?: string;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export function OptionButton({
  label,
  icon,
  selected = false,
  onClick,
  disabled = false,
}: OptionButtonProps) {
  return (
    <button
      className={`duration-fast ease-smooth focus:ring-primary flex w-full items-center gap-16 rounded-lg border-2 p-16 text-left transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
        selected
          ? 'border-primary bg-primary/5'
          : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
      } `}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      {icon && (
        <span className="text-primary flex-shrink-0">
          <Icon name={icon} size={22} strokeWidth={1.5} />
        </span>
      )}
      <span className="text-body font-medium">{label}</span>
    </button>
  );
}
