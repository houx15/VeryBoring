import type { EntryType } from '@/lib/types';
import {
  createProvider,
  isValidProvider,
  getProviderDefinition,
  LLMAuthError,
  LLMError,
} from '@/lib/llm';
import { buildExplainPrompt } from '@/lib/prompts';

interface ExplainRequestBody {
  entryType: EntryType;
  answers: Record<string, string>;
  snippet: string;
  provider: string;
  apiKey: string;
  model: string;
  baseUrl: string;
}

const VALID_ENTRY_TYPES: ReadonlySet<string> = new Set<EntryType>(['eat', 'move', 'do', 'go']);

export async function POST(request: Request): Promise<Response> {
  let body: ExplainRequestBody;
  try {
    body = (await request.json()) as ExplainRequestBody;
  } catch {
    return Response.json({ error: '请求格式不正确' }, { status: 400 });
  }

  const { entryType, answers, snippet, provider, apiKey, model, baseUrl } = body;

  if (!entryType || !VALID_ENTRY_TYPES.has(entryType)) {
    return Response.json({ error: '请选择一个入口类型' }, { status: 400 });
  }

  if (!answers || typeof answers !== 'object' || Object.keys(answers).length === 0) {
    return Response.json({ error: '请提供用户回答' }, { status: 400 });
  }

  if (!snippet || typeof snippet !== 'string') {
    return Response.json({ error: '请提供需要解释的建议内容' }, { status: 400 });
  }

  if (!provider || !isValidProvider(provider)) {
    return Response.json({ error: '请选择 AI 服务提供商' }, { status: 400 });
  }

  if (!apiKey || typeof apiKey !== 'string') {
    return Response.json({ error: '请提供 API 密钥' }, { status: 400 });
  }

  if (!model || typeof model !== 'string') {
    return Response.json({ error: '请提供模型名称' }, { status: 400 });
  }

  if (!baseUrl || typeof baseUrl !== 'string') {
    return Response.json({ error: '请提供 API 地址' }, { status: 400 });
  }

  try {
    const providerDef = getProviderDefinition(provider);
    if (!providerDef) {
      return Response.json({ error: '不支持的 AI 服务提供商' }, { status: 400 });
    }

    const messages = buildExplainPrompt(entryType, answers, snippet);
    const llmProvider = createProvider(providerDef.protocol, baseUrl);
    const explanation = await llmProvider.generate({ messages, apiKey, model });

    return Response.json({ explanation });
  } catch (err) {
    if (err instanceof LLMAuthError) {
      return Response.json({ error: 'API 密钥无效或已过期，请检查后重试' }, { status: 401 });
    }

    if (err instanceof LLMError) {
      return Response.json({ error: err.message }, { status: 500 });
    }

    return Response.json({ error: '出了点意外，请稍后再试' }, { status: 500 });
  }
}
