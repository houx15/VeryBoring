'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getSettings, saveSettings } from '@/lib/storage/settings';
const PROVIDERS = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'anthropic', label: 'Anthropic' },
] as const;

function loadInitialValues() {
  const settings = getSettings();
  return {
    provider: (settings?.provider ?? 'openai') as 'openai' | 'anthropic',
    apiKey: settings?.apiKey ?? '',
    hasExistingSettings: !!settings?.apiKey,
  };
}

export default function SettingsPage() {
  const [initial] = useState(loadInitialValues);
  const [provider, setProvider] = useState<'openai' | 'anthropic'>(initial.provider);
  const [apiKey, setApiKey] = useState(initial.apiKey);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    saveSettings({ provider, apiKey, preferences: {} });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col">
      <Section spacing="section">
        <PageContainer>
          <Link
            href="/"
            className="inline-flex items-center gap-8 text-neutral-500 hover:text-neutral-700 transition-colors duration-fast mb-32"
          >
            ← 返回
          </Link>

          <h1 className="font-serif text-[32px] font-normal text-foreground mb-48">
            设置
          </h1>

          {!initial.hasExistingSettings && (
            <Card className="mb-24">
              <p className="text-[14px] text-neutral-500">
                配置 API 密钥后即可开始使用
              </p>
            </Card>
          )}

          <div className="flex flex-col gap-32">
            <Card>
              <h2 className="text-[16px] font-medium text-foreground mb-24">
                AI 服务商
              </h2>
              <div className="flex flex-col gap-16">
                {PROVIDERS.map((p) => (
                  <label
                    key={p.value}
                    className="flex items-center gap-12 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="provider"
                      value={p.value}
                      checked={provider === p.value}
                      onChange={(e) =>
                        setProvider(e.target.value as 'openai' | 'anthropic')
                      }
                      className="w-20 h-20 accent-primary cursor-pointer"
                    />
                    <span className="text-[14px] text-foreground">
                      {p.label}
                    </span>
                  </label>
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="text-[16px] font-medium text-foreground mb-16">
                API 密钥
              </h2>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={
                    provider === 'openai'
                      ? 'sk-... (在 OpenAI 控制台获取)'
                      : 'sk-ant-... (在 Anthropic 控制台获取)'
                  }
                  className="w-full h-48 px-16 pr-48 rounded-lg border border-neutral-200 bg-white text-[14px] text-foreground placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-12 top-1/2 -translate-y-1/2 p-8 text-neutral-400 hover:text-neutral-600 transition-colors duration-fast"
                  aria-label={showApiKey ? '隐藏密钥' : '显示密钥'}
                >
                  {showApiKey ? '隐藏' : '显示'}
                </button>
              </div>
            </Card>

            <div className="flex items-center gap-16">
              <Button onClick={handleSave} className="flex-1">
                保存
              </Button>
              {isSaved && (
                <span className="text-[14px] text-success">已保存</span>
              )}
            </div>
          </div>
        </PageContainer>
      </Section>
    </div>
  );
}
