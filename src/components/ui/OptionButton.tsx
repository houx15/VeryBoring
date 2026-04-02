'use client';

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
      className={`
        w-full flex items-center gap-16
        p-16 rounded-lg
        border-2 transition-all duration-fast ease-smooth
        text-left
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
        ${
          selected
            ? 'border-primary bg-primary/5'
            : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
        }
      `}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      {icon && <span className="text-2xl flex-shrink-0">{icon}</span>}
      <span className="text-body font-medium">{label}</span>
    </button>
  );
}
