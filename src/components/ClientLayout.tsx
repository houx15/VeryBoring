'use client';

import { useCallback } from 'react';
import { SettingsProvider, useSettingsModal } from '@/context/SettingsContext';
import { SettingsModal } from '@/components/SettingsModal';
import { getSettings } from '@/lib/storage/settings';

const checkedComponents = new Set<string>();

function AutoOpenSettings({ componentId }: { componentId: string }) {
  const { openSettings } = useSettingsModal();

  const checkAndOpen = useCallback(() => {
    if (!checkedComponents.has(componentId)) {
      checkedComponents.add(componentId);
      const settings = getSettings();
      if (!settings?.apiKey) {
        queueMicrotask(() => openSettings());
      }
    }
  }, [componentId, openSettings]);

  checkAndOpen();

  return null;
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const componentId =
    typeof window !== 'undefined' ? window.location.pathname + window.location.search : 'static';

  return (
    <SettingsProvider>
      <AutoOpenSettings componentId={componentId} />
      {children}
      <SettingsModal />
    </SettingsProvider>
  );
}
