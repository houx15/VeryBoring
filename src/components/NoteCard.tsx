'use client';

import { useState } from 'react';
import type { SavedNote } from '@/lib/types';

interface NoteCardProps {
  note: SavedNote;
  onDelete: (id: string) => void;
}

function getRotation(id: string): number {
  // Deterministic pseudo-random rotation based on id
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash + id.charCodeAt(i)) | 0;
  }
  return (hash % 7) - 3; // -3 to 3 degrees
}

export function NoteCard({ note, onDelete }: NoteCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const rotation = getRotation(note.id);

  const dateStr = new Date(note.createdAt).toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
  });

  const timeStr = new Date(note.createdAt).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className="group relative cursor-pointer rounded-lg bg-[#faf6ed] px-24 py-20 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
      style={{ transform: `rotate(${rotation}deg)` }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(note.id);
        }}
        className="absolute top-12 right-12 flex h-24 w-24 items-center justify-center rounded-full text-neutral-300 opacity-0 transition-all group-hover:opacity-100 hover:bg-neutral-100 hover:text-neutral-500"
        aria-label="删除纸条"
      >
        <svg
          width="14"
          height="14"
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

      <div className="mb-12 flex flex-wrap items-center gap-8">
        <span className="text-[12px] text-neutral-400">{note.symbolName}</span>
        <span className="text-[11px] text-neutral-300">
          {dateStr} {timeStr}
        </span>
        {note.season && <span className="text-[11px] text-neutral-300">{note.season}</span>}
        {note.timeOfDay && <span className="text-[11px] text-neutral-300">{note.timeOfDay}</span>}
      </div>

      <p
        className={`font-serif text-[14px] leading-[1.8] text-neutral-600 ${
          !isExpanded ? 'line-clamp-3' : ''
        }`}
      >
        {note.content}
      </p>
    </div>
  );
}
