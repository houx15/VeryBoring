import type { EntryType } from '@/lib/types';
import type { LLMMessage } from '@/lib/llm/provider';

const ENTRY_TYPE_LABEL: Record<EntryType, string> = {
  eat: '用户想吃点东西',
  move: '用户想运动一下',
  do: '用户想做点什么',
  go: '用户想出去玩',
} as const;

const SYSTEM_PROMPT = `你是一个随性的朋友，正在解释为什么给了一个建议。要求：

- 用2-3句话简单说明为什么这个建议适合当前情况
- 语气轻松随意，像朋友在解释
- 用中文
- 不要太长，简洁有力
- 可以提到用户的需求或偏好
- 语气要有"这个挺好的，就这样吧"的感觉`;

export function buildExplainPrompt(
  entryType: EntryType,
  answers: Record<string, string>,
  snippet: string,
): LLMMessage[] {
  const contextLabel = ENTRY_TYPE_LABEL[entryType];
  const answersText = Object.entries(answers)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join('\n');

  const userMessage = `${contextLabel}。

用户回答了以下问题：
${answersText}

我给出的建议是：
"${snippet}"

请简要解释为什么这个建议适合用户当前的情况。`;

  return [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: userMessage },
  ];
}
