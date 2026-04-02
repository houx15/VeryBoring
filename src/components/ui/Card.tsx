interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  const isClickable = !!onClick;

  return (
    <div
      className={`
        bg-neutral-50 rounded-lg p-24
        ${isClickable ? 'cursor-pointer transition-all duration-fast ease-smooth hover:bg-neutral-100 active:bg-neutral-200' : ''}
        ${className}
      `}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {children}
    </div>
  );
}
