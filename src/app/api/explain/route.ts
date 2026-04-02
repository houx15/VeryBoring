import type { EntryType } from '@/lib/types';
import { createProvider, LLMAuthError, LLMError, type ProviderName } from '@/lib/llm';
import { buildExplainPrompt } from '@/lib/prompts';

interface ExplainRequestBody {
  entryType: EntryType;
  answers: Record<string, string>;
  snippet: string;
  provider: ProviderName;
  apiKey: string;
}

const VALID_ENTRY_TYPES: ReadonlySet<string> = new Set<EntryType>(['eat', 'move', 'do', 'go']);
const VALID_PROVIDERS: ReadonlySet<string> = new Set<ProviderName>(['openai', 'anthropic']);

export async function POST(request: Request): Promise<Response> {
  let body: ExplainRequestBody;
  try {
    body = (await request.json()) as ExplainRequestBody;
  } catch {
    return Response.json(
      { error: '请求格式不正确' },
      { status: 400 },
    );
  }

  const { entryType, answers, snippet, provider, apiKey } = body;

  if (!entryType || !VALID_ENTRY_TYPES.has(entryType)) {
    return Response.json(
      { error: '请选择一个入口类型' },
      { status: 400 },
    );
  }

  if (!answers || typeof answers !== 'object' || Object.keys(answers).length === 0) {
    return Response.json(
      { error: '请提供用户回答' },
      { status: 400 },
    );
  }

  if (!snippet || typeof snippet !== 'string') {
    return Response.json(
      { error: '请提供需要解释的建议内容' },
      { status: 400 },
    );
  }

  if (!provider || !VALID_PROVIDERS.has(provider)) {
    return Response.json(
      { error: '请选择 AI 服务提供商' },
      { status: 400 },
    );
  }

  if (!apiKey || typeof apiKey !== 'string') {
    return Response.json(
      { error: '请提供 API 密钥' },
      { status: 400 },
    );
  }

  try {
    const messages = buildExplainPrompt(entryType, answers, snippet);
    const llmProvider = createProvider(provider);
    const explanation = await llmProvider.generate({ messages, apiKey });

    return Response.json({ explanation });
  } catch (err) {
    if (err instanceof LLMAuthError) {
      return Response.json(
        { error: 'API 密钥无效或已过期，请检查后重试' },
        { status: 401 },
      );
    }

    if (err instanceof LLMError) {
      return Response.json(
        { error: err.message },
        { status: 500 },
      );
    }

    return Response.json(
      { error: '出了点意外，请稍后再试' },
      { status: 500 },
    );
  }
}
