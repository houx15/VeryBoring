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
  generateStream(options: LLMGenerateOptions): AsyncIterable<string>;
}

export function createProvider(protocol: 'openai' | 'anthropic', baseUrl: string): LLMProvider {
  switch (protocol) {
    case 'openai':
      return new OpenAIProvider(baseUrl);
    case 'anthropic':
      return new AnthropicProvider(baseUrl);
    default:
      throw new Error(`不支持的 AI 协议: ${protocol satisfies never}`);
  }
}
