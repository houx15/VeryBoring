import type { UserSettings } from '@/lib/types';
import { getItem, removeItem, setItem } from './helpers';

const SETTINGS_KEY = 'vb-settings';

export function getSettings(): UserSettings | null {
  return getItem<UserSettings | null>(SETTINGS_KEY, null);
}

export function saveSettings(settings: UserSettings): void {
  setItem(SETTINGS_KEY, settings);
}

export function clearSettings(): void {
  removeItem(SETTINGS_KEY);
}
