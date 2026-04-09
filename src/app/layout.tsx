import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ClientLayout } from '@/components/ClientLayout';
import { Footer } from '@/components/Footer';

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
        <ClientLayout>
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
