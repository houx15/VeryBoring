import type { DrawnCard, SymbolDefinition } from '@/lib/types';
import { SYMBOL_DEFINITIONS } from './definitions';

export function getSymbolById(id: string): SymbolDefinition | undefined {
  return SYMBOL_DEFINITIONS.find((s) => s.id === id);
}

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function drawCards(): DrawnCard[] {
  const shuffled = shuffle(SYMBOL_DEFINITIONS);
  const selected: SymbolDefinition[] = [];
  const elementCounts: Record<string, number> = {};

  for (const symbol of shuffled) {
    if (selected.length >= 5) break;
    const count = elementCounts[symbol.element] ?? 0;
    if (count >= 2) continue;
    selected.push(symbol);
    elementCounts[symbol.element] = count + 1;
  }

  return selected.map((symbol, index) => ({
    symbol,
    position: index + 1,
  }));
}
