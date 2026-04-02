import {
  LLMAuthError,
  LLMError,
  LLMRateLimitError,
  LLMValidationError,
} from './errors';
import type { LLMGenerateOptions, LLMProvider } from './provider';

const DEFAULT_MODEL = 'gpt-4o-mini';
const DEFAULT_TEMPERATURE = 0.8;
const DEFAULT_MAX_TOKENS = 500;
const API_URL = 'https://api.openai.com/v1/chat/completions';

interface OpenAIChoice {
  message: { content: string | null };
  finish_reason: string;
}

interface OpenAIResponse {
  choices: OpenAIChoice[];
  error?: { message: string };
}

export class OpenAIProvider implements LLMProvider {
  async generate(options: LLMGenerateOptions): Promise<string> {
    const {
      messages,
      apiKey,
      model = DEFAULT_MODEL,
      temperature = DEFAULT_TEMPERATURE,
      maxTokens = DEFAULT_MAX_TOKENS,
    } = options;

    const body = JSON.stringify({
      model,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      temperature,
      max_tokens: maxTokens,
    });

    let response: Response;
    try {
      response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body,
      });
    } catch {
      throw new LLMError(
        `网络请求失败，请检查网络连接`,
        'NETWORK_ERROR',
      );
    }

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new LLMAuthError();
      }
      if (response.status === 429) {
        throw new LLMRateLimitError();
      }
      throw new LLMError(
        `AI 服务暂时不可用，请稍后再试`,
        'PROVIDER_ERROR',
      );
    }

    let data: OpenAIResponse;
    try {
      data = (await response.json()) as OpenAIResponse;
    } catch {
      throw new LLMValidationError('AI 返回了无法解析的内容');
    }

    if (data.error) {
      throw new LLMError(
        `AI 服务报错: ${data.error.message}`,
        'PROVIDER_ERROR',
      );
    }

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new LLMValidationError('AI 没有返回有效内容，请重试');
    }

    return content.trim();
  }
}
