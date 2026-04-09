import { LLMAuthError, LLMError, LLMRateLimitError, LLMValidationError } from './errors';
import type { LLMGenerateOptions, LLMProvider } from './provider';

const DEFAULT_MODEL = 'gpt-4o-mini';
const DEFAULT_TEMPERATURE = 0.8;
const DEFAULT_MAX_TOKENS = 500;
const DEFAULT_BASE_URL = 'https://api.openai.com/v1';

interface OpenAIChoice {
  message: { content: string | null };
  finish_reason: string;
}

interface OpenAIResponse {
  choices: OpenAIChoice[];
  error?: { message: string };
}

export class OpenAIProvider implements LLMProvider {
  private readonly apiUrl: string;

  constructor(baseUrl: string = DEFAULT_BASE_URL) {
    this.apiUrl = `${baseUrl}/chat/completions`;
  }

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
      response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
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

    let data: OpenAIResponse;
    try {
      data = (await response.json()) as OpenAIResponse;
    } catch {
      throw new LLMValidationError('AI 返回了无法解析的内容');
    }

    if (data.error) {
      throw new LLMError(`AI 服务报错: ${data.error.message}`, 'PROVIDER_ERROR');
    }

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new LLMValidationError('AI 没有返回有效内容，请重试');
    }

    return content.trim();
  }

  async *generateStream(options: LLMGenerateOptions): AsyncIterable<string> {
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
      stream: true,
    });

    let response: Response;
    try {
      response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body,
      });
    } catch {
      throw new LLMError('网络请求失败，请检查网络连接', 'NETWORK_ERROR');
    }

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new LLMAuthError();
      }
      if (response.status === 429) {
        throw new LLMRateLimitError();
      }
      throw new LLMError('AI 服务暂时不可用，请稍后再试', 'PROVIDER_ERROR');
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new LLMError('无法读取流式响应', 'STREAM_ERROR');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) continue;
          const data = trimmed.slice(6);
          if (data === '[DONE]') return;

          try {
            const parsed = JSON.parse(data) as {
              choices?: Array<{ delta?: { content?: string } }>;
            };
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) yield content;
          } catch {
            // Skip malformed JSON chunks
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}
