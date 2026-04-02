import { LLMAuthError, LLMError, LLMRateLimitError, LLMValidationError } from './errors';
import type { LLMGenerateOptions, LLMProvider } from './provider';

const DEFAULT_MODEL = 'claude-sonnet-4-20250514';
const DEFAULT_TEMPERATURE = 0.8;
const DEFAULT_MAX_TOKENS = 500;
const DEFAULT_BASE_URL = 'https://api.anthropic.com';
const ANTHROPIC_VERSION = '2023-06-01';

interface AnthropicContentBlock {
  type: 'text';
  text: string;
}

interface AnthropicResponse {
  content: AnthropicContentBlock[];
  stop_reason: string | null;
  error?: { message: string };
}

export class AnthropicProvider implements LLMProvider {
  private readonly apiUrl: string;

  constructor(baseUrl: string = DEFAULT_BASE_URL) {
    this.apiUrl = `${baseUrl}/v1/messages`;
  }

  async generate(options: LLMGenerateOptions): Promise<string> {
    const {
      messages,
      apiKey,
      model = DEFAULT_MODEL,
      temperature = DEFAULT_TEMPERATURE,
      maxTokens = DEFAULT_MAX_TOKENS,
    } = options;

    // Anthropic separates system messages from the conversation array
    const systemMessages: string[] = [];
    const conversationMessages: { role: 'user' | 'assistant'; content: string }[] = [];

    for (const msg of messages) {
      if (msg.role === 'system') {
        systemMessages.push(msg.content);
      } else {
        conversationMessages.push({ role: msg.role, content: msg.content });
      }
    }

    const body = JSON.stringify({
      model,
      system: systemMessages.length > 0 ? systemMessages.join('\n\n') : undefined,
      messages: conversationMessages,
      temperature,
      max_tokens: maxTokens,
    });

    let response: Response;
    try {
      response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': ANTHROPIC_VERSION,
        },
        body,
      });
    } catch {
      throw new LLMError(`网络请求失败，请检查网络连接`, 'NETWORK_ERROR');
    }

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new LLMAuthError();
      }
      if (response.status === 429) {
        throw new LLMRateLimitError();
      }
      throw new LLMError(`AI 服务暂时不可用，请稍后再试`, 'PROVIDER_ERROR');
    }

    let data: AnthropicResponse;
    try {
      data = (await response.json()) as AnthropicResponse;
    } catch {
      throw new LLMValidationError('AI 返回了无法解析的内容');
    }

    if (data.error) {
      throw new LLMError(`AI 服务报错: ${data.error.message}`, 'PROVIDER_ERROR');
    }

    const textBlock = data.content?.find((block) => block.type === 'text');
    if (!textBlock?.text) {
      throw new LLMValidationError('AI 没有返回有效内容，请重试');
    }

    return textBlock.text.trim();
  }
}
