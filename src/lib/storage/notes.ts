import type { SavedNote } from '@/lib/types';
import { getItem, setItem, removeItem } from './helpers';

const NOTES_KEY = 'vb-notes';

export function getNotes(): SavedNote[] {
  return getItem<SavedNote[]>(NOTES_KEY, []);
}

export function saveNote(note: SavedNote): void {
  const notes = getNotes();
  notes.unshift(note); // newest first
  setItem(NOTES_KEY, notes);
}

export function deleteNote(id: string): void {
  const notes = getNotes().filter((n) => n.id !== id);
  setItem(NOTES_KEY, notes);
}

export function clearNotes(): void {
  removeItem(NOTES_KEY);
}
