import { describe, it, expect } from 'vitest';
import {
  ELEMENTS,
  getElementConfig,
  SYMBOL_DEFINITIONS,
  SYMBOL_SVG_MAP,
  drawCards,
  getSymbolById,
} from '../index';
import type { Element } from '@/lib/types';

describe('Symbol System', () => {
  describe('SYMBOL_DEFINITIONS', () => {
    it('has exactly 50 symbols', () => {
      expect(SYMBOL_DEFINITIONS).toHaveLength(50);
    });

    it('has 10 symbols per element', () => {
      const elements: Element[] = ['metal', 'wood', 'water', 'fire', 'earth'];
      for (const el of elements) {
        const count = SYMBOL_DEFINITIONS.filter((s) => s.element === el).length;
        expect(count, `element "${el}" should have 10 symbols`).toBe(10);
      }
    });

    it('has unique ids for all symbols', () => {
      const ids = SYMBOL_DEFINITIONS.map((s) => s.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('ELEMENTS', () => {
    it('has 5 elements', () => {
      expect(ELEMENTS).toHaveLength(5);
    });

    it('contains all expected element ids', () => {
      const ids = ELEMENTS.map((e) => e.id);
      expect(ids).toEqual(expect.arrayContaining(['metal', 'wood', 'water', 'fire', 'earth']));
    });

    it('each element has required config fields', () => {
      for (const el of ELEMENTS) {
        expect(el).toHaveProperty('id');
        expect(el).toHaveProperty('name');
        expect(el).toHaveProperty('borderColor');
        expect(el).toHaveProperty('tone');
        expect(typeof el.id).toBe('string');
        expect(typeof el.name).toBe('string');
        expect(typeof el.borderColor).toBe('string');
        expect(typeof el.tone).toBe('string');
      }
    });
  });

  describe('getElementConfig()', () => {
    it('returns correct config for each element', () => {
      const elements: Element[] = ['metal', 'wood', 'water', 'fire', 'earth'];
      for (const el of elements) {
        const config = getElementConfig(el);
        expect(config.id).toBe(el);
      }
    });

    it('throws for invalid element', () => {
      expect(() => getElementConfig('invalid' as Element)).toThrow('Unknown element: invalid');
    });
  });

  describe('getSymbolById()', () => {
    it('returns correct symbol for valid id', () => {
      const symbol = getSymbolById('mirror');
      expect(symbol).toBeDefined();
      expect(symbol?.id).toBe('mirror');
      expect(symbol?.name).toBe('镜');
      expect(symbol?.element).toBe('metal');
    });

    it('returns undefined for invalid id', () => {
      expect(getSymbolById('nonexistent')).toBeUndefined();
    });
  });

  describe('drawCards()', () => {
    it('returns exactly 5 cards', () => {
      const cards = drawCards();
      expect(cards).toHaveLength(5);
    });

    it('cards have positions 1-5', () => {
      const cards = drawCards();
      const positions = cards.map((c) => c.position);
      expect(positions).toEqual([1, 2, 3, 4, 5]);
    });

    it('all symbols are unique (no duplicates)', () => {
      const cards = drawCards();
      const ids = cards.map((c) => c.symbol.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('respects element diversity (max 2 same element)', () => {
      // Run multiple times since drawCards is random
      for (let i = 0; i < 20; i++) {
        const cards = drawCards();
        const elementCounts: Record<string, number> = {};
        for (const card of cards) {
          const count = elementCounts[card.symbol.element] ?? 0;
          elementCounts[card.symbol.element] = count + 1;
        }
        for (const [, count] of Object.entries(elementCounts)) {
          expect(count).toBeLessThanOrEqual(2);
        }
      }
    });

    it('each card has valid symbol with correct structure', () => {
      const cards = drawCards();
      for (const card of cards) {
        expect(card.symbol).toHaveProperty('id');
        expect(card.symbol).toHaveProperty('name');
        expect(card.symbol).toHaveProperty('element');
        expect(typeof card.symbol.id).toBe('string');
        expect(typeof card.symbol.name).toBe('string');
        expect(['metal', 'wood', 'water', 'fire', 'earth']).toContain(card.symbol.element);
      }
    });
  });

  describe('SYMBOL_SVG_MAP', () => {
    it('has an entry for every symbol definition', () => {
      for (const def of SYMBOL_DEFINITIONS) {
        expect(SYMBOL_SVG_MAP[def.id], `SVG map should have entry for "${def.id}"`).toBeDefined();
      }
    });

    it('has no extra entries beyond symbol definitions', () => {
      const defIds = new Set(SYMBOL_DEFINITIONS.map((s) => s.id));
      const mapKeys = Object.keys(SYMBOL_SVG_MAP);
      for (const key of mapKeys) {
        expect(defIds.has(key), `SVG map key "${key}" should exist in definitions`).toBe(true);
      }
    });
  });
});
