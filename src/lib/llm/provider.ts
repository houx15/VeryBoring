import type { EntryType } from '@/lib/types';
import type { UserPreferences } from '@/lib/types';
import { OpenAIProvider } from './openai';
import { AnthropicProvider } from './anthropic';

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMGenerateOptions {
  messages: LLMMessage[];
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface LLMProvider {
  generate(options: LLMGenerateOptions): Promise<string>;
}

export type ProviderName = 'openai' | 'anthropic';

export function createProvider(provider: ProviderName): LLMProvider {
  switch (provider) {
    case 'openai':
      return new OpenAIProvider();
    case 'anthropic':
      return new AnthropicProvider();
    default:
      throw new Error(`不支持的 AI 服务: ${provider satisfies never}`);
  }
}

export type { EntryType, UserPreferences };
