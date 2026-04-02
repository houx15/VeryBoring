import {
  createProvider,
  isValidProvider,
  getProviderDefinition,
  LLMAuthError,
  LLMError,
} from '@/lib/llm';

interface TestConnectionRequestBody {
  provider: string;
  apiKey: string;
  model: string;
  baseUrl: string;
}

export async function POST(request: Request): Promise<Response> {
  let body: TestConnectionRequestBody;
  try {
    body = (await request.json()) as TestConnectionRequestBody;
  } catch {
    return Response.json({ error: '请求格式不正确' }, { status: 400 });
  }

  const { provider, apiKey, model, baseUrl } = body;

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

    const llmProvider = createProvider(providerDef.protocol, baseUrl);
    const result = await llmProvider.generate({
      messages: [{ role: 'user', content: 'Hi, reply with just "ok".' }],
      apiKey,
      model,
      temperature: 0,
      maxTokens: 5,
    });

    return Response.json({ success: true, message: result.trim() });
  } catch (err) {
    if (err instanceof LLMAuthError) {
      return Response.json({ error: 'API 密钥无效或已过期，请检查后重试' }, { status: 401 });
    }

    if (err instanceof LLMError) {
      return Response.json({ error: err.message }, { status: 500 });
    }

    return Response.json({ error: '连接失败，请检查配置' }, { status: 500 });
  }
}
