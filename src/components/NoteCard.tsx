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
  const [showModal, setShowModal] = useState(false);
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
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="group flex h-[168px] w-[120px] flex-col items-center justify-center rounded-xl border-2 bg-[#faf8f4] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md md:h-[190px] md:w-[136px]"
        style={{ borderColor: elementConfig.borderColor }}
        aria-label={`查看纸条：${note.symbolName}`}
      >
        {SymbolSVG ? (
          <>
            <div className="flex flex-1 items-center justify-center">
              <SymbolSVG size={60} color={elementConfig.borderColor} />
            </div>
            <div className="pb-16">
              <span className="font-serif text-[20px]" style={{ color: elementConfig.borderColor }}>
                {note.symbolName}
              </span>
            </div>
          </>
        ) : (
          <span className="font-serif text-[20px]" style={{ color: elementConfig.borderColor }}>
            {note.symbolName}
          </span>
        )}
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-16"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-[420px] rounded-2xl bg-white p-32 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-24 flex items-center gap-16">
              <div
                className="flex h-[56px] w-[40px] flex-col items-center justify-center rounded-lg border-2 bg-[#faf8f4]"
                style={{ borderColor: elementConfig.borderColor }}
              >
                {SymbolSVG && <SymbolSVG size={28} color={elementConfig.borderColor} />}
              </div>
              <div>
                <span
                  className="font-serif text-[18px]"
                  style={{ color: elementConfig.borderColor }}
                >
                  {note.symbolName}
                </span>
                <div className="mt-4 flex gap-8">
                  <span className="text-[12px] text-neutral-400">
                    {dateStr} {timeStr}
                  </span>
                  {note.season && (
                    <span className="text-[12px] text-neutral-300">{note.season}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-[#faf6ed] px-24 py-20">
              <p className="font-serif text-[16px] leading-[1.9] text-neutral-700">{secret}</p>
            </div>

            {action && (
              <div className="mt-16 flex items-start gap-12 rounded-xl border border-[#c8956a]/20 bg-[#c8956a]/5 px-20 py-16">
                <span className="mt-1 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-[#c8956a]/15">
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
                  <p className="mt-4 text-[14px] leading-[1.7] text-neutral-600">{action}</p>
                </div>
              </div>
            )}

            <div className="mt-24 flex justify-between">
              <button
                type="button"
                onClick={() => {
                  onDelete(note.id);
                  setShowModal(false);
                }}
                className="rounded-lg px-16 py-10 text-[13px] text-neutral-400 transition-colors hover:bg-neutral-50 hover:text-neutral-600"
              >
                删除
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg bg-neutral-100 px-24 py-10 text-[14px] text-neutral-600 transition-colors hover:bg-neutral-200"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
