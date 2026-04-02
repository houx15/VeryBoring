import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { HistoryEntry, UserSettings } from '@/lib/types';
import {
  getSettings,
  saveSettings,
  clearSettings,
  getHistory,
  addHistory,
  clearHistory,
  getHistoryByType,
  hasOnboarded,
  markOnboarded,
  resetOnboarding,
} from '@/lib/storage';

const sampleSettings: UserSettings = {
  provider: 'openai',
  apiKey: 'sk-test-key',
  model: 'gpt-4o-mini',
  baseUrl: 'https://api.openai.com/v1',
  preferences: { diet: 'light', activity: 'outdoor' },
};

function makeEntry(overrides: Partial<HistoryEntry> = {}): HistoryEntry {
  return {
    id: 'entry-1',
    entryType: 'eat',
    answers: { q1: 'a1' },
    snippet: {
      actionPath: 'Go eat ramen',
      timeEstimate: '30 min',
      sceneDescription: 'Cozy ramen shop nearby',
      rawResponse: 'raw',
    },
    accepted: true,
    timestamp: Date.now(),
    ...overrides,
  };
}

describe('Settings storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns null when no settings saved', () => {
    expect(getSettings()).toBeNull();
  });

  it('saves and retrieves settings', () => {
    saveSettings(sampleSettings);
    expect(getSettings()).toEqual(sampleSettings);
  });

  it('overwrites settings on save', () => {
    saveSettings(sampleSettings);
    const updated: UserSettings = {
      ...sampleSettings,
      provider: 'anthropic',
      apiKey: 'ant-key',
      model: 'claude-sonnet-4-20250514',
      baseUrl: 'https://api.anthropic.com',
    };
    saveSettings(updated);
    expect(getSettings()).toEqual(updated);
  });

  it('clears settings', () => {
    saveSettings(sampleSettings);
    clearSettings();
    expect(getSettings()).toBeNull();
  });
});

describe('History storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty array when no history', () => {
    expect(getHistory()).toEqual([]);
  });

  it('adds and retrieves entries', () => {
    const entry = makeEntry();
    addHistory(entry);
    expect(getHistory()).toHaveLength(1);
    expect(getHistory()[0]).toEqual(entry);
  });

  it('appends multiple entries', () => {
    addHistory(makeEntry({ id: '1' }));
    addHistory(makeEntry({ id: '2', entryType: 'move' }));
    expect(getHistory()).toHaveLength(2);
  });

  it('filters by entry type', () => {
    addHistory(makeEntry({ id: '1', entryType: 'eat' }));
    addHistory(makeEntry({ id: '2', entryType: 'move' }));
    addHistory(makeEntry({ id: '3', entryType: 'eat' }));
    expect(getHistoryByType('eat')).toHaveLength(2);
    expect(getHistoryByType('move')).toHaveLength(1);
    expect(getHistoryByType('go')).toHaveLength(0);
  });

  it('enforces max 100 entries', () => {
    for (let i = 0; i < 110; i++) {
      addHistory(makeEntry({ id: String(i), timestamp: i }));
    }
    const history = getHistory();
    expect(history).toHaveLength(100);
    expect(history[0].id).toBe('10');
    expect(history[99].id).toBe('109');
  });

  it('clears history', () => {
    addHistory(makeEntry());
    clearHistory();
    expect(getHistory()).toEqual([]);
  });
});

describe('Onboarding storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns false by default', () => {
    expect(hasOnboarded()).toBe(false);
  });

  it('marks and checks onboarding', () => {
    markOnboarded();
    expect(hasOnboarded()).toBe(true);
  });

  it('resets onboarding', () => {
    markOnboarded();
    resetOnboarding();
    expect(hasOnboarded()).toBe(false);
  });
});

describe('SSR safety', () => {
  const originalWindow = globalThis.window;

  afterEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(globalThis, 'window', {
      value: originalWindow,
      writable: true,
    });
  });

  it('getSettings returns null when window is undefined', () => {
    Object.defineProperty(globalThis, 'window', {
      value: undefined,
      writable: true,
    });
    expect(getSettings()).toBeNull();
  });

  it('getHistory returns empty array when window is undefined', () => {
    Object.defineProperty(globalThis, 'window', {
      value: undefined,
      writable: true,
    });
    expect(getHistory()).toEqual([]);
  });

  it('hasOnboarded returns false when window is undefined', () => {
    Object.defineProperty(globalThis, 'window', {
      value: undefined,
      writable: true,
    });
    expect(hasOnboarded()).toBe(false);
  });
});
