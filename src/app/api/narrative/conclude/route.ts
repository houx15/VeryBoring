import {
  createProvider,
  isValidProvider,
  getProviderDefinition,
  LLMError,
  LLMAuthError,
} from '@/lib/llm';
import { buildConcludePrompt } from '@/lib/prompts/narrative-v1';
import { getSymbolById, getElementConfig } from '@/lib/symbols';
import { buildNarrativeContext } from '@/lib/context/narrative-context';
import type { Element, NarrativeStep } from '@/lib/types';

interface ConcludeRequest {
  provider: string;
  apiKey: string;
  model: string;
  baseUrl: string;
  symbolId: string;
  element: Element;
  history: NarrativeStep[];
}

function createSSEEvent(data: object): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

export async function POST(request: Request): Promise<Response> {
  let body: ConcludeRequest;
  try {
    body = (await request.json()) as ConcludeRequest;
  } catch {
    return Response.json({ error: '请求格式不正确' }, { status: 400 });
  }

  const { provider, apiKey, model, baseUrl, symbolId, element, history } = body;

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

  if (!symbolId || !element || !history?.length) {
    return Response.json({ error: '缺少参数' }, { status: 400 });
  }

  const symbol = getSymbolById(symbolId);
  const displaySymbolName = symbol?.name ?? getElementConfig(element).name;
  const context = buildNarrativeContext(displaySymbolName, element);
  const messages = buildConcludePrompt(context, history);

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      const send = (data: object) => {
        controller.enqueue(encoder.encode(createSSEEvent(data)));
      };

      try {
        const providerDef = getProviderDefinition(provider);
        if (!providerDef) {
          send({ type: 'error', message: '不支持的 AI 服务提供商' });
          controller.close();
          return;
        }

        const llmProvider = createProvider(providerDef.protocol, baseUrl);

        for await (const chunk of llmProvider.generateStream({
          messages,
          apiKey,
          model,
          temperature: 0.9,
          maxTokens: 200,
        })) {
          send({ type: 'text', content: chunk });
        }

        send({ type: 'done' });
      } catch (err) {
        if (err instanceof LLMAuthError) {
          send({ type: 'error', message: 'API 密钥无效' });
        } else if (err instanceof LLMError) {
          send({ type: 'error', message: err.message });
        } else {
          send({ type: 'error', message: '纸条生成失败' });
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
