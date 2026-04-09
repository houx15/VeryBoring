'use client';

import { createContext, useCallback, useContext, useState } from 'react';

interface SettingsContextValue {
  isOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
}

const SettingsContext = createContext<SettingsContextValue>({
  isOpen: false,
  openSettings: () => {},
  closeSettings: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openSettings = useCallback(() => setIsOpen(true), []);
  const closeSettings = useCallback(() => setIsOpen(false), []);

  return (
    <SettingsContext.Provider value={{ isOpen, openSettings, closeSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettingsModal() {
  return useContext(SettingsContext);
}
