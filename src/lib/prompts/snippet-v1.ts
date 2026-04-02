import type { EntryType, UserPreferences } from '@/lib/types';
import type { LLMMessage } from '@/lib/llm/provider';

const ENTRY_TYPE_LABEL: Record<EntryType, string> = {
  eat: '用户想吃点东西',
  move: '用户想运动一下',
  do: '用户想做点什么',
  go: '用户想出去玩',
} as const;

const SYSTEM_PROMPT = `你是一个非常随性的朋友，帮人决定"现在做什么"。你的风格：

- 语气像朋友聊天，轻松随意
- 永远只给一个建议，不要给多个选项
- 不要追求"最优解"，"够好就行"
- 输出的必须是一个可以直接执行的"生活片段"
- 用中文回复
- 不要用编号列表，用自然的段落描述
- 时间估计要具体（比如"15分钟"而不是"一会儿"）
- 加一点场景感，让人有点画面

输出格式要求：一段自然的文字，包含：
1. 具体行动路径（做什么、怎么做）
2. 大概需要多长时间
3. 一点轻场景描述（天气、氛围、感受等）

例子：
"现在出门走15分钟，找一家附近的小店，点一个简单的主食，吃完别急着走，慢慢走回来。路上可能会经过那个小公园，可以坐一会儿。"

记住：你是在帮朋友决定现在要做什么，不是在写攻略。语气要有"今天就这样吧"的感觉。`;

function formatAnswers(answers: Record<string, string>): string {
  return Object.entries(answers)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join('\n');
}

function formatPreferences(preferences?: UserPreferences): string {
  if (!preferences) return '';
  const parts: string[] = [];
  if (preferences.diet && preferences.diet !== 'none') {
    parts.push(`饮食偏好: ${preferences.diet === 'light' ? '偏清淡' : '偏重口'}`);
  }
  if (preferences.activity) {
    parts.push(`活动偏好: ${preferences.activity === 'home' ? '偏宅' : '偏外出'}`);
  }
  if (preferences.budget) {
    const budgetMap = { low: '低预算', medium: '中等预算', high: '不太在意预算' };
    parts.push(`预算: ${budgetMap[preferences.budget]}`);
  }
  if (preferences.exerciseLevel) {
    const exerciseMap = { light: '轻度运动', moderate: '中等强度', intense: '高强度' };
    parts.push(`运动强度: ${exerciseMap[preferences.exerciseLevel]}`);
  }
  return parts.length > 0 ? `\n用户偏好:\n${parts.map((p) => `- ${p}`).join('\n')}` : '';
}

export function buildSnippetPrompt(
  entryType: EntryType,
  answers: Record<string, string>,
  preferences?: UserPreferences,
): LLMMessage[] {
  const contextLabel = ENTRY_TYPE_LABEL[entryType];
  const answersText = formatAnswers(answers);
  const preferencesText = formatPreferences(preferences);

  const userMessage = `${contextLabel}。

用户回答了以下问题：
${answersText}${preferencesText}

请给出一个具体可执行的"生活片段"建议。只给一个，不要给多个。`;

  return [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: userMessage },
  ];
}
