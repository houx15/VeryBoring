interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div
      className={`w-full max-w-[640px] mx-auto px-16 md:px-24 ${className}`}
    >
      {children}
    </div>
  );
}
