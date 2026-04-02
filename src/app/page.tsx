'use client';

import Link from 'next/link';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Icon } from '@/components/ui/Icon';
import { entryLabels } from '@/features';

const ENTRY_CONFIG = [
  { id: 'eat', href: '/eat', bgClass: 'bg-[#f5f0e8]', iconColor: 'text-[#b8784a]' },
  { id: 'move', href: '/move', bgClass: 'bg-[#e8f0e8]', iconColor: 'text-[#5a8a5a]' },
  { id: 'do', href: '/do', bgClass: 'bg-[#ece8f0]', iconColor: 'text-[#7a6a9a]' },
  { id: 'go', href: '/go', bgClass: 'bg-[#e8ecf0]', iconColor: 'text-[#5a7a9a]' },
] as const;

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Section spacing="section" className="flex flex-1 flex-col justify-center">
        <PageContainer>
          <div className="mb-48 text-center md:mb-64">
            <h1
              className="text-foreground animate-fade-in mb-16 font-serif text-[40px] font-normal tracking-tight opacity-0 md:text-[56px]"
              style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
            >
              Very Boring
            </h1>
            <p
              className="animate-fade-in text-[16px] leading-relaxed text-neutral-500 opacity-0 md:text-[18px]"
              style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
            >
              懒得决定？帮你选一个，直接去做。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
            {ENTRY_CONFIG.map((entry, index) => {
              const labelInfo = entryLabels[entry.id];
              return (
                <Link
                  key={entry.id}
                  href={entry.href}
                  className="group animate-fade-in-up block no-underline opacity-0"
                  style={{
                    animationDelay: `${300 + index * 100}ms`,
                    animationFillMode: 'forwards',
                  }}
                >
                  <div
                    className={` ${entry.bgClass} flex h-[160px] flex-col items-center justify-center rounded-2xl p-32 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)] group-active:scale-[0.98] md:h-[180px] md:p-40`}
                  >
                    <div
                      className={`mb-16 ${entry.iconColor} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon name={labelInfo.icon} size={36} strokeWidth={1.5} />
                    </div>
                    <span className="text-foreground text-[18px] font-medium tracking-tight md:text-[20px]">
                      {labelInfo.title}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </PageContainer>
      </Section>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
    </div>
  );
}
