interface SectionProps {
  children: React.ReactNode;
  spacing?: 'section' | 'block';
  className?: string;
}

const SPACING_CLASSES = {
  section: 'py-64 md:py-80',
  block: 'py-24 md:py-32',
} as const;

export function Section({
  children,
  spacing = 'section',
  className = '',
}: SectionProps) {
  return (
    <section className={`${SPACING_CLASSES[spacing]} ${className}`}>
      {children}
    </section>
  );
}
