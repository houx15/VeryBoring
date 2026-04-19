import { getItem, setItem } from './helpers';

const VISITED_KEY = 'vb-has-visited';

export function hasVisited(): boolean {
  return getItem<boolean>(VISITED_KEY, false);
}

export function markVisited(): void {
  setItem(VISITED_KEY, true);
}
