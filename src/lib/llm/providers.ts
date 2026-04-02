import type { ProviderDefinition } from '@/lib/types';

export const PROVIDER_REGISTRY: ProviderDefinition[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    protocol: 'openai',
    baseUrl: 'https://api.openai.com/v1',
    defaultModel: 'gpt-4.1-mini',
    models: ['gpt-4.1-mini', 'gpt-4.1', 'gpt-4.1-nano', 'o3', 'o4-mini'],
    placeholder: 'sk-...',
  },
  {
    id: 'anthropic',
    name: 'Claude',
    protocol: 'anthropic',
    baseUrl: 'https://api.anthropic.com',
    defaultModel: 'claude-sonnet-4-20250514',
    models: ['claude-sonnet-4-20250514', 'claude-haiku-4-20250414', 'claude-3-5-haiku-20241022'],
    placeholder: 'sk-ant-...',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    protocol: 'openai',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai',
    defaultModel: 'gemini-2.5-flash',
    models: ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.0-flash'],
    placeholder: 'AIza...',
  },
  {
    id: 'kimi',
    name: 'Kimi',
    protocol: 'openai',
    baseUrl: 'https://api.moonshot.cn/v1',
    defaultModel: 'moonshot-v1-128k',
    models: ['moonshot-v1-128k', 'moonshot-v1-32k', 'kimi-latest'],
    placeholder: 'sk-...',
  },
  {
    id: 'qwen',
    name: 'Qwen',
    protocol: 'openai',
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    defaultModel: 'qwen3-235b-a22b',
    models: ['qwen3-235b-a22b', 'qwen-plus', 'qwen-turbo', 'qwen-max'],
    placeholder: 'sk-...',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    protocol: 'openai',
    baseUrl: 'https://api.deepseek.com',
    defaultModel: 'deepseek-chat',
    models: ['deepseek-chat', 'deepseek-reasoner'],
    placeholder: 'sk-...',
  },
  {
    id: 'glm',
    name: 'GLM',
    protocol: 'openai',
    baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
    defaultModel: 'glm-4-flash',
    models: ['glm-4-flash', 'glm-4-air', 'glm-4-plus', 'glm-4-long', 'glm-z1-flash'],
    placeholder: 'xxx.yyy...',
  },
  {
    id: 'volcengine',
    name: 'Volcengine',
    protocol: 'openai',
    baseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
    defaultModel: 'doubao-1.5-pro-256k',
    models: ['doubao-1.5-pro-256k', 'doubao-1.5-pro-32k', 'doubao-1.5-lite-32k'],
    placeholder: 'ep-...',
  },
  {
    id: 'minimax',
    name: 'MiniMax',
    protocol: 'openai',
    baseUrl: 'https://api.minimax.chat/v1',
    defaultModel: 'MiniMax-M1',
    models: ['MiniMax-M1', 'MiniMax-Text-01'],
    placeholder: '...',
  },
];

const providerMap = new Map(PROVIDER_REGISTRY.map((p) => [p.id, p]));

export function getProviderDefinition(providerId: string): ProviderDefinition | undefined {
  return providerMap.get(providerId);
}

export function getAllProviders(): ProviderDefinition[] {
  return PROVIDER_REGISTRY;
}

export function isValidProvider(providerId: string): boolean {
  return providerMap.has(providerId);
}
