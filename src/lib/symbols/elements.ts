import type { Element, ElementConfig } from '@/lib/types';

export const ELEMENTS: ElementConfig[] = [
  {
    id: 'metal',
    name: '金',
    borderColor: '#A8A8B0',
    tone: '精确、结构、秩序。语言简洁有力，像金属般清晰。',
  },
  {
    id: 'wood',
    name: '木',
    borderColor: '#4A7A4A',
    tone: '成长、自然、生机。语言温和有机，像植物生长般自然展开。',
  },
  {
    id: 'water',
    name: '水',
    borderColor: '#3A6B8C',
    tone: '流动、情感、直觉。语言柔软流动，像水一样引导叙事。',
  },
  {
    id: 'fire',
    name: '火',
    borderColor: '#C4704A',
    tone: '能量、行动、热情。语言明亮有力，像火焰般跳跃。',
  },
  {
    id: 'earth',
    name: '土',
    borderColor: '#8B7355',
    tone: '沉稳、落地、踏实。语言厚重温暖，像大地一样承载。',
  },
];

export function getElementConfig(element: Element): ElementConfig {
  const config = ELEMENTS.find((e) => e.id === element);
  if (!config) {
    throw new Error(`Unknown element: ${element}`);
  }
  return config;
}
