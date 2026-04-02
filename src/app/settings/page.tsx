'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { getSettings, saveSettings } from '@/lib/storage/settings';
import { getAllProviders, getProviderDefinition } from '@/lib/llm/providers';
import type { UserPreferences } from '@/lib/types';

interface FormState {
  provider: string;
  apiKey: string;
  model: string;
  baseUrl: string;
  isCustomModel: boolean;
}

function loadInitialValues(): FormState & { hasExistingSettings: boolean } {
  const settings = getSettings();
  const defaultProvider = getAllProviders()[0];

  if (settings) {
    const providerDef = getProviderDefinition(settings.provider);
    const isCustomModel = providerDef ? !providerDef.models.includes(settings.model) : true;

    return {
      provider: settings.provider,
      apiKey: settings.apiKey ?? '',
      model: settings.model ?? providerDef?.defaultModel ?? '',
      baseUrl: settings.baseUrl ?? providerDef?.baseUrl ?? '',
      isCustomModel,
      hasExistingSettings: !!settings.apiKey,
    };
  }

  return {
    provider: defaultProvider.id,
    apiKey: '',
    model: defaultProvider.defaultModel,
    baseUrl: defaultProvider.baseUrl,
    isCustomModel: false,
    hasExistingSettings: false,
  };
}

const CUSTOM_MODEL_VALUE = '__custom__';

export default function SettingsPage() {
  const [initial] = useState(loadInitialValues);
  const [formState, setFormState] = useState<FormState>({
    provider: initial.provider,
    apiKey: initial.apiKey,
    model: initial.model,
    baseUrl: initial.baseUrl,
    isCustomModel: initial.isCustomModel,
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const providers = useMemo(() => getAllProviders(), []);
  const selectedProvider = useMemo(
    () => getProviderDefinition(formState.provider),
    [formState.provider],
  );

  const handleProviderChange = (providerId: string) => {
    const providerDef = getProviderDefinition(providerId);
    if (providerDef) {
      setFormState((prev) => ({
        ...prev,
        provider: providerId,
        model: providerDef.defaultModel,
        baseUrl: providerDef.baseUrl,
        isCustomModel: false,
      }));
    }
  };

  const handleModelChange = (value: string) => {
    if (value === CUSTOM_MODEL_VALUE) {
      setFormState((prev) => ({
        ...prev,
        model: '',
        isCustomModel: true,
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        model: value,
        isCustomModel: false,
      }));
    }
  };

  const handleSave = () => {
    const settings = {
      provider: formState.provider,
      apiKey: formState.apiKey,
      model: formState.model,
      baseUrl: formState.baseUrl,
      preferences: {} as UserPreferences,
    };
    saveSettings(settings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const canSave = formState.provider && formState.apiKey && formState.model;

  return (
    <div className="flex flex-1 flex-col">
      <Section spacing="section">
        <PageContainer>
          <Link
            href="/"
            className="duration-fast mb-32 inline-flex items-center gap-8 text-neutral-500 transition-colors hover:text-neutral-700"
          >
            <Icon name="ChevronLeft" size={16} strokeWidth={2} />
            <span className="text-[14px]">返回</span>
          </Link>

          <h1 className="text-foreground mb-48 font-serif text-[32px] font-normal">设置</h1>

          {!initial.hasExistingSettings && (
            <Card className="border-primary/20 bg-primary/5 mb-24 border">
              <div className="flex items-start gap-12">
                <Icon name="Info" size={18} className="text-primary mt-1 flex-shrink-0" />
                <p className="text-[14px] leading-relaxed text-neutral-600">
                  配置 API 密钥后即可开始使用
                </p>
              </div>
            </Card>
          )}

          <div className="flex flex-col gap-32">
            <Card>
              <h2 className="text-foreground mb-24 text-[16px] font-medium">AI 服务商</h2>
              <div className="grid grid-cols-3 gap-8 sm:grid-cols-3">
                {providers.map((provider) => {
                  const isSelected = formState.provider === provider.id;
                  return (
                    <button
                      key={provider.id}
                      onClick={() => handleProviderChange(provider.id)}
                      className={`duration-fast ease-smooth flex h-48 flex-col items-center justify-center gap-4 rounded-lg border px-8 text-center transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      <span className="text-[13px] leading-tight font-medium">{provider.name}</span>
                      {isSelected && (
                        <div className="bg-primary flex h-5 w-5 items-center justify-center rounded-full">
                          <Icon name="Check" size={10} strokeWidth={3} className="text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </Card>

            {selectedProvider && (
              <Card>
                <h2 className="text-foreground mb-16 text-[16px] font-medium">模型</h2>
                <div className="relative">
                  <div className="absolute top-1/2 left-16 -translate-y-1/2 text-neutral-400">
                    <Icon name="Box" size={16} strokeWidth={1.5} />
                  </div>
                  <select
                    value={formState.isCustomModel ? CUSTOM_MODEL_VALUE : formState.model}
                    onChange={(e) => handleModelChange(e.target.value)}
                    className="text-foreground focus:ring-primary/30 focus:border-primary duration-fast h-48 w-full cursor-pointer appearance-none rounded-xl border border-neutral-200 bg-white pr-48 pl-44 text-[14px] transition-all focus:ring-2 focus:outline-none"
                  >
                    {selectedProvider.models.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                    <option value={CUSTOM_MODEL_VALUE}>其他（自定义）</option>
                  </select>
                  <div className="pointer-events-none absolute top-1/2 right-16 -translate-y-1/2 text-neutral-400">
                    <Icon name="ChevronDown" size={16} strokeWidth={1.5} />
                  </div>
                </div>
                {formState.isCustomModel && (
                  <div className="mt-12">
                    <input
                      type="text"
                      value={formState.model}
                      onChange={(e) => setFormState((prev) => ({ ...prev, model: e.target.value }))}
                      placeholder="输入自定义模型名称"
                      className="text-foreground focus:ring-primary/30 focus:border-primary duration-fast h-48 w-full rounded-xl border border-neutral-200 bg-white px-16 text-[14px] transition-all placeholder:text-neutral-400 focus:ring-2 focus:outline-none"
                    />
                  </div>
                )}
              </Card>
            )}

            {selectedProvider && (
              <Card>
                <div className="mb-16 flex items-center justify-between">
                  <h2 className="text-foreground text-[16px] font-medium">API 地址</h2>
                  <span className="text-[12px] text-neutral-400">高级设置</span>
                </div>
                <div className="relative">
                  <div className="absolute top-1/2 left-16 -translate-y-1/2 text-neutral-400">
                    <Icon name="Link" size={16} strokeWidth={1.5} />
                  </div>
                  <input
                    type="text"
                    value={formState.baseUrl}
                    onChange={(e) => setFormState((prev) => ({ ...prev, baseUrl: e.target.value }))}
                    placeholder={selectedProvider.baseUrl}
                    className="text-foreground focus:ring-primary/30 focus:border-primary duration-fast h-48 w-full rounded-xl border border-neutral-200 bg-white pr-16 pl-44 text-[14px] transition-all placeholder:text-neutral-400 focus:ring-2 focus:outline-none"
                  />
                </div>
                <p className="mt-8 text-[12px] text-neutral-400">
                  如需使用代理或自定义端点，可修改此地址
                </p>
              </Card>
            )}

            <Card>
              <h2 className="text-foreground mb-16 text-[16px] font-medium">API 密钥</h2>
              <div className="relative">
                <div className="absolute top-1/2 left-16 -translate-y-1/2 text-neutral-400">
                  <Icon name="Key" size={16} strokeWidth={1.5} />
                </div>
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={formState.apiKey}
                  onChange={(e) => setFormState((prev) => ({ ...prev, apiKey: e.target.value }))}
                  placeholder={selectedProvider?.placeholder ?? '输入 API 密钥'}
                  className="text-foreground focus:ring-primary/30 focus:border-primary duration-fast h-48 w-full rounded-xl border border-neutral-200 bg-white pr-48 pl-44 text-[14px] transition-all placeholder:text-neutral-400 focus:ring-2 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="duration-fast absolute top-1/2 right-16 -translate-y-1/2 p-8 text-neutral-400 transition-colors hover:text-neutral-600"
                  aria-label={showApiKey ? '隐藏密钥' : '显示密钥'}
                >
                  <Icon name={showApiKey ? 'EyeOff' : 'Eye'} size={18} strokeWidth={1.5} />
                </button>
              </div>
            </Card>

            <div className="flex flex-col gap-16">
              <Button onClick={handleSave} disabled={!canSave} className="w-full">
                保存
              </Button>
              <div className="flex h-24 items-center justify-center">
                {isSaved && (
                  <div className="text-success animate-fade-in flex items-center gap-8">
                    <div className="bg-success/10 flex h-20 w-20 items-center justify-center rounded-full">
                      <Icon name="Check" size={14} strokeWidth={2.5} className="text-success" />
                    </div>
                    <span className="text-[14px] font-medium">已保存</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>
    </div>
  );
}
