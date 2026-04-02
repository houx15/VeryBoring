function isSSR(): boolean {
  return typeof window === 'undefined';
}

export function getItem<T>(key: string, fallback: T): T {
  if (isSSR()) {
    return fallback;
  }
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setItem<T>(key: string, value: T): void {
  if (isSSR()) {
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {

  }
}

export function removeItem(key: string): void {
  if (isSSR()) {
    return;
  }
  try {
    localStorage.removeItem(key);
  } catch {

  }
}
