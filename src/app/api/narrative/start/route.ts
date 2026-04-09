import {
  createProvider,
  isValidProvider,
  getProviderDefinition,
  LLMError,
  LLMAuthError,
} from '@/lib/llm';
import { buildStartPrompt } from '@/lib/prompts/narrative-v1';
import { getSymbolById } from '@/lib/symbols';
import { getElementConfig } from '@/lib/symbols';
import { buildNarrativeContext } from '@/lib/context/narrative-context';
import type { Element, NarrativeOption } from '@/lib/types';

interface StartRequest {
  provider: string;
  apiKey: string;
  model: string;
  baseUrl: string;
  symbolId: string;
  element: Element;
}

interface StartResponse {
  sceneText: string;
  options: NarrativeOption[];
}

export async function POST(request: Request): Promise<Response> {
  let body: StartRequest;
  try {
    body = (await request.json()) as StartRequest;
  } catch {
    return Response.json({ error: '请求格式不正确' }, { status: 400 });
  }

  const { provider, apiKey, model, baseUrl, symbolId, element } = body;

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

  if (!symbolId || !element) {
    return Response.json({ error: '缺少参数' }, { status: 400 });
  }

  const symbol = getSymbolById(symbolId);
  const displaySymbolName = symbol?.name ?? getElementConfig(element).name;
  const context = buildNarrativeContext(displaySymbolName, element);
  const messages = buildStartPrompt(context);

  try {
    const providerDef = getProviderDefinition(provider);
    if (!providerDef) {
      return Response.json({ error: '不支持的 AI 服务提供商' }, { status: 400 });
    }

    const llmProvider = createProvider(providerDef.protocol, baseUrl);
    const raw = await llmProvider.generate({
      messages,
      apiKey,
      model,
      temperature: 0.9,
      maxTokens: 500,
    });

    let parsed: { sceneText?: string; options?: NarrativeOption[] };
    try {
      const cleaned = raw
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleaned);
    } catch {
      return Response.json({ error: '叙事生成失败，请重试' }, { status: 500 });
    }

    if (!parsed.sceneText || !parsed.options?.length) {
      return Response.json({ error: '叙事生成失败，请重试' }, { status: 500 });
    }

    return Response.json({
      sceneText: parsed.sceneText,
      options: parsed.options.slice(0, 2),
    } satisfies StartResponse);
  } catch (err) {
    if (err instanceof LLMAuthError) {
      return Response.json({ error: 'API 密钥无效' }, { status: 401 });
    }
    if (err instanceof LLMError) {
      return Response.json({ error: err.message }, { status: 500 });
    }
    return Response.json({ error: '叙事生成失败' }, { status: 500 });
  }
}
