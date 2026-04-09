'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { DrawnCard, NarrativeOption, NarrativeStep, SavedNote } from '@/lib/types';
import { getSettings } from '@/lib/storage/settings';
import { saveNote } from '@/lib/storage/notes';
import { NarrativeScene } from './NarrativeScene';
import { NarrativeChoice } from './NarrativeChoice';
import { useSSEStream } from '@/hooks/useSSEStream';

interface NarrativeGameProps {
  card: DrawnCard;
  onRestart: () => void;
}

type GamePhase = 'loading' | 'scene' | 'choosing' | 'streaming' | 'concluding' | 'note';

export function NarrativeGame({ card, onRestart }: NarrativeGameProps) {
  const [phase, setPhase] = useState<GamePhase>('loading');
  const [history, setHistory] = useState<NarrativeStep[]>([]);
  const [currentScene, setCurrentScene] = useState('');
  const [currentOptions, setCurrentOptions] = useState<NarrativeOption[]>([]);
  const [noteText, setNoteText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { startStream, text: streamText, error: streamError } = useSSEStream();
  const stepCountRef = useRef(0);

  const getLLMSettings = useCallback(() => {
    const settings = getSettings();
    if (!settings) {
      setError('请先配置 AI 设置');
      return null;
    }
    return {
      provider: settings.provider,
      apiKey: settings.apiKey,
      model: settings.model,
      baseUrl: settings.baseUrl,
    };
  }, []);

  useEffect(() => {
    const fetchStart = async () => {
      const settings = getLLMSettings();
      if (!settings) return;

      setPhase('loading');
      setError(null);

      try {
        const response = await fetch('/api/narrative/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...settings,
            symbolId: card.symbol.id,
            element: card.symbol.element,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: '生成失败' }));
          setError((errorData as { error: string }).error);
          return;
        }

        const data = (await response.json()) as {
          sceneText: string;
          options: NarrativeOption[];
        };
        setCurrentScene(data.sceneText);
        setCurrentOptions(data.options);
        setPhase('scene');
      } catch {
        setError('网络连接失败');
      }
    };

    fetchStart();
  }, [card, getLLMSettings]);

  const handleSceneComplete = useCallback(() => {
    setPhase('choosing');
  }, []);

  const handleChoose = useCallback(
    async (option: NarrativeOption) => {
      const settings = getLLMSettings();
      if (!settings) return;

      const currentStep: NarrativeStep = {
        sceneText: currentScene,
        options: currentOptions,
        choiceId: option.id,
        choiceText: option.text,
      };
      const newHistory = [...history, currentStep];
      setHistory(newHistory);
      stepCountRef.current += 1;

      const shouldConclude =
        stepCountRef.current >= 3 && (stepCountRef.current >= 5 || Math.random() > 0.4);

      if (shouldConclude) {
        setPhase('concluding');
        const result = await startStream('/api/narrative/conclude', {
          ...settings,
          symbolId: card.symbol.id,
          element: card.symbol.element,
          history: newHistory,
        });
        if (result !== null) {
          setNoteText(result);
          setPhase('note');
        }
      } else {
        setPhase('streaming');
        const result = await startStream('/api/narrative/step', {
          ...settings,
          symbolId: card.symbol.id,
          element: card.symbol.element,
          history: newHistory,
          choiceId: option.id,
          choiceText: option.text,
        });

        if (result) {
          try {
            const cleaned = result
              .replace(/```json\n?/g, '')
              .replace(/```\n?/g, '')
              .trim();
            const parsed = JSON.parse(cleaned) as {
              sceneText: string;
              options: NarrativeOption[];
            };
            setCurrentScene(parsed.sceneText);
            setCurrentOptions(parsed.options.slice(0, 2));
            setPhase('scene');
          } catch {
            setError('叙事解析失败，请重试');
          }
        }
      }
    },
    [currentScene, currentOptions, history, card, getLLMSettings, startStream],
  );

  const handleKeepNote = useCallback(() => {
    const note: SavedNote = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      symbolName: card.symbol.name,
      element: card.symbol.element,
      content: noteText,
      createdAt: new Date().toISOString(),
    };
    saveNote(note);
    onRestart();
  }, [noteText, card, onRestart]);

  const handleDiscardNote = useCallback(() => {
    onRestart();
  }, [onRestart]);

  if (streamError && phase !== 'loading') {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-[16px] text-neutral-500">{streamError}</p>
        <button
          type="button"
          onClick={onRestart}
          className="mt-24 rounded-lg border border-neutral-200 px-24 py-12 text-[14px] text-neutral-600 transition-colors hover:bg-neutral-50"
        >
          重新抽牌
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-[16px] text-neutral-500">{error}</p>
        <button
          type="button"
          onClick={onRestart}
          className="mt-24 rounded-lg border border-neutral-200 px-24 py-12 text-[14px] text-neutral-600 transition-colors hover:bg-neutral-50"
        >
          重新抽牌
        </button>
      </div>
    );
  }

  const symbolBadge = (
    <div className="mb-24 text-center">
      <span className="text-[13px] text-neutral-400">{card.symbol.name}</span>
    </div>
  );

  if (phase === 'loading') {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        {symbolBadge}
        <div className="animate-pulse-soft text-[16px] text-neutral-400">正在翻开命运...</div>
      </div>
    );
  }

  if (phase === 'scene' || phase === 'choosing') {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        {symbolBadge}
        <NarrativeScene text={currentScene} onComplete={handleSceneComplete} />
        {phase === 'choosing' && (
          <NarrativeChoice options={currentOptions} onChoose={handleChoose} />
        )}
      </div>
    );
  }

  if (phase === 'streaming' || phase === 'concluding') {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        {symbolBadge}
        {phase === 'streaming' ? (
          <div className="animate-pulse-soft text-[16px] text-neutral-400">正在编织...</div>
        ) : (
          <NarrativeScene text={streamText} />
        )}
      </div>
    );
  }

  if (phase === 'note') {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <div
          className="animate-note-unfold mx-auto max-w-[400px] rounded-lg bg-[#faf6ed] px-32 py-24 shadow-md"
          style={{ transform: 'rotate(2deg)' }}
        >
          <p className="font-serif text-[16px] leading-[1.9] text-neutral-700">{noteText}</p>
        </div>
        <div className="mt-32 flex gap-16">
          <button
            type="button"
            onClick={handleKeepNote}
            className="rounded-lg border border-neutral-200 bg-white px-24 py-12 text-[14px] text-neutral-600 transition-all hover:border-neutral-300 hover:shadow-sm active:scale-[0.98]"
          >
            收起来
          </button>
          <button
            type="button"
            onClick={handleDiscardNote}
            className="rounded-lg px-24 py-12 text-[14px] text-neutral-400 transition-colors hover:text-neutral-600"
          >
            丢掉
          </button>
        </div>
      </div>
    );
  }

  return null;
}
