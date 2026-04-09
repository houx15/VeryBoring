import type { Element, NarrativeContext, NarrativeStep } from '@/lib/types';
import type { LLMMessage } from '@/lib/llm';

const SYSTEM_PROMPT = `你是一个神秘的叙事引导者。你的语言简短、诗意、带有氛围感。你用第二人称"你"来讲述。你从不说教，从不解释。你只是描述，然后让听者自己选择。

规则：
- 每段场景文字 2-3 句话，简洁、有画面感
- 每次给出 2 个选项，都有效，都没有对错
- 不要出现任何 AI 标识，不要说"作为 AI"
- 输出必须是严格 JSON 格式，不要包含 markdown 代码块标记
- 不要重复之前的场景
- 叙事要像一段短梦，不要太理性，也不要太荒诞`;

function getElementTone(element: Element): string {
  const tones: Record<Element, string> = {
    metal: '精确、结构、秩序。语言简洁有力',
    wood: '成长、自然、生机。语言温和有机',
    water: '流动、情感、直觉。语言柔软流动',
    fire: '能量、行动、热情。语言明亮有力',
    earth: '沉稳、落地、踏实。语言厚重温暖',
  };
  return tones[element];
}

function describeTimeOfDay(timeOfDay: string): string {
  const descriptions: Record<string, string> = {
    dawn: '天刚亮',
    morning: '上午',
    afternoon: '午后',
    evening: '傍晚',
    night: '夜深了',
  };
  return descriptions[timeOfDay] ?? '此刻';
}

export function buildStartPrompt(context: NarrativeContext): LLMMessage[] {
  const elementTone = getElementTone(context.element);

  return [
    { role: 'system', content: SYSTEM_PROMPT },
    {
      role: 'user',
      content: `一张牌被翻开，上面刻着「${context.symbolName}」的符号。

现在的时刻：${context.dayOfWeek}，${describeTimeOfDay(context.timeOfDay)}，${context.season}。
元素的基调：${elementTone}

请生成叙事的第一幕。输出严格 JSON：
{
  "sceneText": "2-3句话的场景描述",
  "options": [
    { "id": "a", "text": "选项A" },
    { "id": "b", "text": "选项B" }
  ]
}`,
    },
  ];
}

export function buildStepPrompt(
  context: NarrativeContext,
  history: NarrativeStep[],
  choiceId: string,
  choiceText: string,
): LLMMessage[] {
  const stepNumber = history.length + 1;
  const isFinalStep = stepNumber >= 4;

  const messages: LLMMessage[] = [{ role: 'system', content: SYSTEM_PROMPT }];

  for (const step of history) {
    messages.push({ role: 'assistant', content: step.sceneText });
    if (step.choiceText) {
      messages.push({ role: 'user', content: step.choiceText });
    }
  }

  const shouldConclude = isFinalStep && Math.random() > 0.3;

  if (shouldConclude) {
    messages.push({
      role: 'user',
      content: `你选择了「${choiceText}」。这是倒数第二步。请生成下一个场景，并给出两个选项。故事的结尾快要来了。输出 JSON：{"sceneText":"...","options":[{"id":"a","text":"..."},{"id":"b","text":"..."}]}`,
    });
  } else {
    messages.push({
      role: 'user',
      content: `你选择了「${choiceText}」。请继续叙事。输出 JSON：{"sceneText":"...","options":[{"id":"a","text":"..."},{"id":"b","text":"..."}]}`,
    });
  }

  return messages;
}

export function buildConcludePrompt(
  context: NarrativeContext,
  history: NarrativeStep[],
): LLMMessage[] {
  const elementTone = getElementTone(context.element);

  const historySummary = history
    .map((step, i) => {
      const choice = step.choiceText ? ` → 选择了「${step.choiceText}」` : '';
      return `第${i + 1}幕：${step.sceneText}${choice}`;
    })
    .join('\n');

  return [
    {
      role: 'system',
      content: `${SYSTEM_PROMPT}

现在你要写一张"小纸条"——它是整个叙事的终点，像是一个秘密，低声告诉你面前的人。

纸条规则：
- 第二人称（"你"）
- 1-3 句话
- 具体、可执行，但不是待办清单
- 像一个朋友低声告诉你一个秘密
- 不要用引号包裹内容
- 只输出纸条内容，不要有其他文字`,
    },
    {
      role: 'user',
      content: `牌面符号：「${context.symbolName}」，元素基调：${elementTone}
时刻：${context.dayOfWeek}，${describeTimeOfDay(context.timeOfDay)}，${context.season}

叙事经过：
${historySummary}

请写下那张小纸条。`,
    },
  ];
}
