'use client';

import { useCallback, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { NoteCard } from '@/components/NoteCard';
import { getNotes, deleteNote } from '@/lib/storage';
import type { SavedNote } from '@/lib/types';

export default function NotesPage() {
  const [notes, setNotes] = useState<SavedNote[]>(() => getNotes());

  const handleDelete = useCallback((id: string) => {
    deleteNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <Section spacing="section" className="flex flex-1 flex-col">
        <PageContainer>
          <div className="mb-40 text-center">
            <h1 className="text-foreground font-serif text-[32px] font-normal tracking-tight">
              纸条盒
            </h1>
            <p className="mt-12 text-[14px] text-neutral-400">你收起来的那些小纸条</p>
          </div>

          {notes.length === 0 ? (
            <div className="py-64 text-center">
              <p className="text-[15px] text-neutral-400">还没有纸条。</p>
              <p className="mt-8 text-[14px] text-neutral-300">去抽一张牌吧。</p>
            </div>
          ) : (
            <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-20 sm:grid-cols-2">
              {notes.map((note) => (
                <NoteCard key={note.id} note={note} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </PageContainer>
      </Section>
    </div>
  );
}
