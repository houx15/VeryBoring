import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";

const ENTRY_POINTS = [
  {
    id: "eat",
    href: "/eat",
    icon: "🍜",
    label: "吃点东西",
  },
  {
    id: "move",
    href: "/move",
    icon: "🏃",
    label: "来点运动",
  },
  {
    id: "do",
    href: "/do",
    icon: "✨",
    label: "做点啥",
  },
  {
    id: "go",
    href: "/go",
    icon: "🗺️",
    label: "去哪玩",
  },
] as const;

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <Section spacing="section" className="flex-1 flex flex-col justify-center">
        <PageContainer>
          <div className="text-center mb-48">
            <h1 className="font-serif text-[40px] md:text-[48px] font-normal tracking-tight text-foreground mb-16">
              Very Boring
            </h1>
            <p className="text-[16px] md:text-[18px] text-neutral-500 leading-relaxed">
              懒得决定？帮你选一个，直接去做。
            </p>
          </div>

          <div className="flex flex-col gap-16">
            {ENTRY_POINTS.map((entry) => (
              <Link
                key={entry.id}
                href={entry.href}
                className="block no-underline"
              >
                <Card className="flex items-center gap-16 py-32 px-24 group">
                  <span className="text-[32px] leading-none">{entry.icon}</span>
                  <span className="text-[18px] md:text-[20px] font-medium text-foreground group-hover:text-primary transition-colors duration-fast">
                    {entry.label}
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </PageContainer>
      </Section>
    </div>
  );
}
