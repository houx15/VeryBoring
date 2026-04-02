import { getItem, removeItem, setItem } from './helpers';

const ONBOARDED_KEY = 'vb-onboarded';

export function hasOnboarded(): boolean {
  return getItem<boolean>(ONBOARDED_KEY, false);
}

export function markOnboarded(): void {
  setItem(ONBOARDED_KEY, true);
}

export function resetOnboarding(): void {
  removeItem(ONBOARDED_KEY);
}
