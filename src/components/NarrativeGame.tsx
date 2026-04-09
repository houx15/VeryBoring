'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { DrawnCard, NarrativeOption, NarrativeStep, SavedNote } from '@/lib/types';
import { getSettings } from '@/lib/storage/settings';
import { saveNote } from '@/lib/storage/notes';
import { buildNarrativeContext } from '@/lib/context/narrative-context';
import { getElementConfig } from '@/lib/symbols';
import { SYMBOL_SVG_MAP } from '@/lib/symbols/svg-patterns';
import { useSettingsModal } from '@/context/SettingsContext';
import { NarrativeScene } from './NarrativeScene';
import { NarrativeChoice } from './NarrativeChoice';
import { useSSEStream } from '@/hooks/useSSEStream';

const TIME_LABELS: Record<string, string> = {
  dawn: '清晨',
  morning: '上午',
  afternoon: '午后',
  evening: '傍晚',
  night: '深夜',
};

function cleanNoteText(raw: string): string {
  let text = raw
    .replace(/```(?:json)?\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();
  try {
    const parsed = JSON.parse(text);
    if (typeof parsed === 'string') return parsed;
    if (typeof parsed === 'object' && parsed !== null) {
      const obj = parsed as Record<string, string>;
      return obj['纸条'] || obj.note || obj.content || obj.text || raw;
    }
  } catch {
    text = text || raw;
  }
  return text;
}

interface ParsedNote {
  scene: string;
  secret: string;
  action: string;
}

function parseNoteContent(raw: string): ParsedNote {
  let scene = '';
  let secret = '';
  let action = '';

  const secretMatch = raw.match(/纸条[：:]\s*([\s\S]*?)(?=行动[：:]|$)/);
  const actionMatch = raw.match(/行动[：:]\s*([\s\S]*?)$/);

  if (secretMatch) {
    secret = secretMatch[1].trim();
    const sceneMatch = raw.match(/^([\s\S]*?)(?=纸条[：:])/);
    if (sceneMatch) scene = sceneMatch[1].trim();
  } else {
    secret = raw;
  }

  if (actionMatch) {
    action = actionMatch[1].trim();
  }

  return { scene, secret, action };
}

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
  const { openSettings } = useSettingsModal();

  const getLLMSettings = useCallback(() => {
    const settings = getSettings();
    if (!settings) {
      openSettings();
      return null;
    }
    return {
      provider: settings.provider,
      apiKey: settings.apiKey,
      model: settings.model,
      baseUrl: settings.baseUrl,
    };
  }, [openSettings]);

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
          const cleaned = cleanNoteText(result);
          setNoteText(cleaned);
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
    const ctx = buildNarrativeContext(card.symbol.name, card.symbol.element);
    const note: SavedNote = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      symbolName: card.symbol.name,
      element: card.symbol.element,
      content: noteText,
      createdAt: new Date().toISOString(),
      season: ctx.season,
      timeOfDay: TIME_LABELS[ctx.timeOfDay] ?? ctx.timeOfDay,
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

  const symbolBadge = (() => {
    const elementConfig = getElementConfig(card.symbol.element);
    const SymbolSVG = SYMBOL_SVG_MAP[card.symbol.id];
    return (
      <div className="mb-32 flex flex-col items-center">
        <div
          className="flex h-[80px] w-[56px] flex-col items-center justify-center rounded-lg border-2 bg-[#faf8f4] shadow-sm md:h-[96px] md:w-[68px]"
          style={{ borderColor: elementConfig.borderColor }}
        >
          <div className="flex flex-1 items-center justify-center">
            <SymbolSVG size={40} color={elementConfig.borderColor} />
          </div>
          <span
            className="pb-8 font-serif text-[16px] md:text-[18px]"
            style={{ color: elementConfig.borderColor }}
          >
            {card.symbol.name}
          </span>
        </div>
      </div>
    );
  })();

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
          <NarrativeChoice
            options={currentOptions}
            element={card.symbol.element}
            onChoose={handleChoose}
          />
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
    const { scene, secret, action } = parseNoteContent(noteText);
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        {scene && (
          <p className="mb-32 font-serif text-[16px] leading-[1.8] text-neutral-500">{scene}</p>
        )}

        <div
          className="animate-note-unfold mx-auto max-w-[400px] rounded-lg bg-[#faf6ed] px-32 py-24 shadow-md"
          style={{ transform: 'rotate(2deg)' }}
        >
          {secret && (
            <p className="font-serif text-[16px] leading-[1.9] text-neutral-700">{secret}</p>
          )}
        </div>

        {action && (
          <div className="mx-auto mt-24 flex max-w-[400px] items-start gap-12 rounded-xl border border-[#c8956a]/20 bg-[#c8956a]/5 px-24 py-16">
            <span className="mt-2 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-[#c8956a]/15">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c8956a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
            <div>
              <span className="text-[12px] font-medium text-[#c8956a]">行动</span>
              <p className="mt-4 text-[14px] leading-[1.7] text-neutral-700">{action}</p>
            </div>
          </div>
        )}

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
