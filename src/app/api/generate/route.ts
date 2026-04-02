import type { EntryType, UserPreferences } from '@/lib/types';
import { createProvider, LLMAuthError, LLMError, type ProviderName } from '@/lib/llm';
import { buildSnippetPrompt } from '@/lib/prompts';

interface GenerateRequestBody {
  entryType: EntryType;
  answers: Record<string, string>;
  provider: ProviderName;
  apiKey: string;
  preferences?: UserPreferences;
}

const VALID_ENTRY_TYPES: ReadonlySet<string> = new Set<EntryType>(['eat', 'move', 'do', 'go']);
const VALID_PROVIDERS: ReadonlySet<string> = new Set<ProviderName>(['openai', 'anthropic']);

export async function POST(request: Request): Promise<Response> {
  let body: GenerateRequestBody;
  try {
    body = (await request.json()) as GenerateRequestBody;
  } catch {
    return Response.json(
      { error: '请求格式不正确' },
      { status: 400 },
    );
  }

  const { entryType, answers, provider, apiKey, preferences } = body;

  if (!entryType || !VALID_ENTRY_TYPES.has(entryType)) {
    return Response.json(
      { error: '请选择一个入口类型' },
      { status: 400 },
    );
  }

  if (!answers || typeof answers !== 'object' || Object.keys(answers).length === 0) {
    return Response.json(
      { error: '请回答问题后再生成建议' },
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
    const messages = buildSnippetPrompt(entryType, answers, preferences);
    const llmProvider = createProvider(provider);
    const snippet = await llmProvider.generate({ messages, apiKey });

    return Response.json({ snippet });
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
