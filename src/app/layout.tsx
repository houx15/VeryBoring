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
  description: '在你不想做决定时，帮你开始生活的小工具',
  keywords: ['决策', '生活', '吃什么', '做什么', '运动', '出行'],
  openGraph: {
    title: 'Very Boring',
    description: '懒得决定？帮你选一个，直接去做。',
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
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="w-full py-16 px-16 md:px-24">
          <div className="w-full max-w-[640px] mx-auto flex justify-end">
            <Link
              href="/settings"
              className="text-neutral-400 hover:text-neutral-600 transition-colors duration-fast"
              aria-label="设置"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
