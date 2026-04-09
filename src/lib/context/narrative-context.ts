import type { Element, NarrativeContext } from '@/lib/types';

type TimeOfDay = 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night';

function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 6 && hour <= 8) return 'dawn';
  if (hour >= 9 && hour <= 11) return 'morning';
  if (hour >= 12 && hour <= 17) return 'afternoon';
  if (hour >= 18 && hour <= 20) return 'evening';
  return 'night';
}

function getDayOfWeek(dayIndex: number): string {
  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return days[dayIndex] ?? '周一';
}

function getSeason(month: number): string {
  if (month === 3) return '初春';
  if (month === 4) return '春';
  if (month === 5) return '暮春';
  if (month === 6) return '初夏';
  if (month === 7) return '夏';
  if (month === 8) return '盛夏';
  if (month === 9) return '初秋';
  if (month === 10) return '秋';
  if (month === 11) return '深秋';
  if (month === 12) return '初冬';
  if (month === 1) return '冬';
  if (month === 2) return '深冬';
  return '春';
}

export function buildNarrativeContext(symbolName: string, element: Element): NarrativeContext {
  const now = new Date();
  const hour = now.getHours();
  const month = now.getMonth() + 1;

  return {
    symbolName,
    element,
    timeOfDay: getTimeOfDay(hour),
    dayOfWeek: getDayOfWeek(now.getDay()),
    season: getSeason(month),
  };
}
