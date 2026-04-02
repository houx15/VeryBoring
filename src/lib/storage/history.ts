import type { EntryType, HistoryEntry } from '@/lib/types';
import { getItem, removeItem, setItem } from './helpers';

const HISTORY_KEY = 'vb-history';
const MAX_ENTRIES = 100;

export function getHistory(): HistoryEntry[] {
  return getItem<HistoryEntry[]>(HISTORY_KEY, []);
}

export function addHistory(entry: HistoryEntry): void {
  const history = getHistory();
  history.push(entry);

  const trimmed = history.slice(-MAX_ENTRIES);
  setItem(HISTORY_KEY, trimmed);
}

export function clearHistory(): void {
  removeItem(HISTORY_KEY);
}

export function getHistoryByType(entryType: EntryType): HistoryEntry[] {
  return getHistory().filter((entry) => entry.entryType === entryType);
}
