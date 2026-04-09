import type { Metadata, Viewport } from 'next';
import './globals.css';
import Link from 'next/link';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#f8f7f5',
};

export const metadata: Metadata = {
  title: {
    default: 'Very Boring',
    template: '%s | Very Boring',
  },
  description: '抽一张牌，走一段短梦，找到一件值得做的小事',
  keywords: ['抽牌', '叙事', '随机', '生活', '小游戏'],
  openGraph: {
    title: 'Very Boring',
    description: '抽一张牌，走一段短梦。',
    type: 'website',
    locale: 'zh_CN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-background text-foreground flex min-h-screen flex-col antialiased">
        <main className="flex flex-1 flex-col">{children}</main>
        <footer className="w-full border-t border-neutral-200/80 px-16 py-16 md:px-24">
          <div className="mx-auto flex w-full max-w-[640px] items-center justify-between">
            <span className="text-[13px] font-medium tracking-tight text-neutral-400">
              Very Boring
            </span>
            <div className="flex items-center gap-8">
              <Link
                href="/notes"
                className="duration-fast rounded-lg p-8 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
                aria-label="纸条盒"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </Link>
              <Link
                href="/settings"
                className="duration-fast -mr-8 rounded-lg p-8 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
                aria-label="设置"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
