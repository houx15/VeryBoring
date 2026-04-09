'use client';

import { useState } from 'react';
import { SYMBOL_DEFINITIONS, getElementConfig } from '@/lib/symbols';
import { SYMBOL_SVG_MAP } from '@/lib/symbols/svg-patterns';
import type { SavedNote } from '@/lib/types';

interface NoteCardProps {
  note: SavedNote;
  onDelete: (id: string) => void;
}

function parseNoteContent(raw: string): { secret: string; action: string } {
  let secret = '';
  let action = '';

  const actionMatch = raw.match(/行动[：:]\s*([\s\S]*?)$/);
  const secretMatch = raw.match(/纸条[：:]\s*([\s\S]*?)(?=行动[：:]|$)/);

  if (secretMatch) {
    secret = secretMatch[1].trim();
  } else {
    secret = raw;
  }

  if (actionMatch) {
    action = actionMatch[1].trim();
  }

  return { secret, action };
}

export function NoteCard({ note, onDelete }: NoteCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const elementConfig = getElementConfig(note.element);

  const symbolDef = SYMBOL_DEFINITIONS.find((s) => s.name === note.symbolName);
  const SymbolSVG = symbolDef ? SYMBOL_SVG_MAP[symbolDef.id] : null;

  const { secret, action } = parseNoteContent(note.content);

  const dateStr = new Date(note.createdAt).toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
  });
  const timeStr = new Date(note.createdAt).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="perspective-1000" style={{ perspective: '1000px' }}>
      <div
        className="group relative cursor-pointer transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className="flex h-[168px] w-[120px] flex-col items-center justify-center rounded-xl border-2 bg-[#faf8f4] shadow-sm md:h-[190px] md:w-[136px]"
          style={{
            borderColor: elementConfig.borderColor,
            backfaceVisibility: 'hidden',
          }}
        >
          {SymbolSVG ? (
            <>
              <div className="flex flex-1 items-center justify-center">
                <SymbolSVG size={60} color={elementConfig.borderColor} />
              </div>
              <div className="pb-16">
                <span
                  className="font-serif text-[20px]"
                  style={{ color: elementConfig.borderColor }}
                >
                  {note.symbolName}
                </span>
              </div>
            </>
          ) : (
            <span className="font-serif text-[20px]" style={{ color: elementConfig.borderColor }}>
              {note.symbolName}
            </span>
          )}
        </div>

        <div
          className="absolute inset-0 flex h-[168px] w-[120px] flex-col rounded-xl border-2 bg-[#faf6ed] px-12 py-12 shadow-sm md:h-[190px] md:w-[136px] md:px-16 md:py-16"
          style={{
            borderColor: elementConfig.borderColor,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
            className="absolute top-8 right-8 z-10 flex h-20 w-20 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-neutral-200 hover:text-neutral-500"
            aria-label="删除纸条"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>

          <div className="mb-8 flex flex-wrap gap-4">
            <span className="text-[9px] text-neutral-400">
              {dateStr} {timeStr}
            </span>
            {note.season && <span className="text-[9px] text-neutral-300">{note.season}</span>}
          </div>

          <p className="flex-1 overflow-hidden font-serif text-[11px] leading-[1.7] text-neutral-700 md:text-[12px]">
            {secret}
          </p>

          {action && (
            <div className="mt-6 border-t border-neutral-200/60 pt-6">
              <span className="text-[9px] text-neutral-400">行动 </span>
              <span className="text-[10px] text-neutral-600">{action}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
