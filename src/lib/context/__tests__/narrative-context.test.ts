import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { buildNarrativeContext } from '../narrative-context';

describe('Narrative Context', () => {
  const validTimeOfDays = ['dawn', 'morning', 'afternoon', 'evening', 'night'] as const;
  const validDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns correct fields', () => {
    vi.setSystemTime(new Date('2025-06-15T14:30:00'));
    const ctx = buildNarrativeContext('镜', 'metal');

    expect(ctx).toHaveProperty('symbolName', '镜');
    expect(ctx).toHaveProperty('element', 'metal');
    expect(ctx).toHaveProperty('timeOfDay');
    expect(ctx).toHaveProperty('dayOfWeek');
    expect(ctx).toHaveProperty('season');
  });

  it('timeOfDay is one of the valid values', () => {
    // Test multiple times to cover different branches
    const testTimes = [
      new Date('2025-06-15T07:00:00'),
      new Date('2025-06-15T10:00:00'),
      new Date('2025-06-15T14:00:00'),
      new Date('2025-06-15T19:00:00'),
      new Date('2025-06-15T23:00:00'),
    ];

    for (const time of testTimes) {
      vi.setSystemTime(time);
      const ctx = buildNarrativeContext('镜', 'metal');
      expect(validTimeOfDays).toContain(ctx.timeOfDay);
    }
  });

  it('maps hours to correct timeOfDay', () => {
    const cases: [number, string][] = [
      [6, 'dawn'],
      [7, 'dawn'],
      [8, 'dawn'],
      [9, 'morning'],
      [10, 'morning'],
      [11, 'morning'],
      [12, 'afternoon'],
      [15, 'afternoon'],
      [17, 'afternoon'],
      [18, 'evening'],
      [19, 'evening'],
      [20, 'evening'],
      [21, 'night'],
      [0, 'night'],
      [5, 'night'],
    ];

    for (const [hour, expected] of cases) {
      vi.setSystemTime(new Date(`2025-06-15T${String(hour).padStart(2, '0')}:00:00`));
      const ctx = buildNarrativeContext('镜', 'metal');
      expect(ctx.timeOfDay).toBe(expected);
    }
  });

  it('dayOfWeek is a Chinese day name', () => {
    // Sunday (June 15, 2025 is a Sunday)
    vi.setSystemTime(new Date('2025-06-15T12:00:00'));
    const ctx = buildNarrativeContext('镜', 'metal');
    expect(ctx.dayOfWeek).toBe('周日');
    expect(validDays).toContain(ctx.dayOfWeek);
  });

  it('maps days of week correctly', () => {
    // Monday June 16
    vi.setSystemTime(new Date('2025-06-16T12:00:00'));
    expect(buildNarrativeContext('镜', 'metal').dayOfWeek).toBe('周一');

    // Tuesday June 17
    vi.setSystemTime(new Date('2025-06-17T12:00:00'));
    expect(buildNarrativeContext('镜', 'metal').dayOfWeek).toBe('周二');

    // Wednesday June 18
    vi.setSystemTime(new Date('2025-06-18T12:00:00'));
    expect(buildNarrativeContext('镜', 'metal').dayOfWeek).toBe('周三');

    // Thursday June 19
    vi.setSystemTime(new Date('2025-06-19T12:00:00'));
    expect(buildNarrativeContext('镜', 'metal').dayOfWeek).toBe('周四');

    // Friday June 20
    vi.setSystemTime(new Date('2025-06-20T12:00:00'));
    expect(buildNarrativeContext('镜', 'metal').dayOfWeek).toBe('周五');

    // Saturday June 21
    vi.setSystemTime(new Date('2025-06-21T12:00:00'));
    expect(buildNarrativeContext('镜', 'metal').dayOfWeek).toBe('周六');
  });

  it('season is a Chinese season string', () => {
    vi.setSystemTime(new Date('2025-06-15T12:00:00'));
    const ctx = buildNarrativeContext('镜', 'metal');
    expect(typeof ctx.season).toBe('string');
    expect(ctx.season.length).toBeGreaterThan(0);
  });

  it('maps months to correct seasons', () => {
    const cases: [number, string][] = [
      [1, '冬'],
      [2, '深冬'],
      [3, '初春'],
      [4, '春'],
      [5, '暮春'],
      [6, '初夏'],
      [7, '夏'],
      [8, '盛夏'],
      [9, '初秋'],
      [10, '秋'],
      [11, '深秋'],
      [12, '初冬'],
    ];

    for (const [month, expected] of cases) {
      const date = new Date(2025, month - 1, 15, 12, 0, 0);
      vi.setSystemTime(date);
      const ctx = buildNarrativeContext('镜', 'metal');
      expect(ctx.season).toBe(expected);
    }
  });

  it('passes through symbolName correctly', () => {
    vi.setSystemTime(new Date('2025-06-15T12:00:00'));
    expect(buildNarrativeContext('焰', 'fire').symbolName).toBe('焰');
    expect(buildNarrativeContext('泉', 'water').symbolName).toBe('泉');
  });

  it('passes through element correctly', () => {
    vi.setSystemTime(new Date('2025-06-15T12:00:00'));
    expect(buildNarrativeContext('镜', 'metal').element).toBe('metal');
    expect(buildNarrativeContext('泉', 'water').element).toBe('water');
  });
});
