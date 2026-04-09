import { describe, it, expect, beforeEach } from 'vitest';
import { getNotes, saveNote, deleteNote, clearNotes } from '../notes';
import type { SavedNote } from '@/lib/types';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

function createNote(overrides: Partial<SavedNote> = {}): SavedNote {
  return {
    id: 'note-1',
    symbolName: '镜',
    element: 'metal',
    content: '在镜子里，你看到了未来的自己。',
    createdAt: '2025-06-15T12:00:00.000Z',
    ...overrides,
  };
}

describe('Notes Storage', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('getNotes()', () => {
    it('returns empty array when no notes exist', () => {
      expect(getNotes()).toEqual([]);
    });

    it('returns stored notes', () => {
      const note = createNote();
      saveNote(note);
      const notes = getNotes();
      expect(notes).toHaveLength(1);
      expect(notes[0].id).toBe('note-1');
    });
  });

  describe('saveNote()', () => {
    it('adds a note and getNotes returns it', () => {
      const note = createNote();
      saveNote(note);
      const notes = getNotes();
      expect(notes).toHaveLength(1);
      expect(notes[0]).toEqual(note);
    });

    it('newest notes appear first', () => {
      const note1 = createNote({ id: 'note-1', content: 'first' });
      const note2 = createNote({ id: 'note-2', content: 'second' });
      const note3 = createNote({ id: 'note-3', content: 'third' });

      saveNote(note1);
      saveNote(note2);
      saveNote(note3);

      const notes = getNotes();
      expect(notes).toHaveLength(3);
      expect(notes[0].id).toBe('note-3');
      expect(notes[1].id).toBe('note-2');
      expect(notes[2].id).toBe('note-1');
    });

    it('preserves all note fields', () => {
      const note: SavedNote = {
        id: 'note-full',
        symbolName: '焰',
        element: 'fire',
        content: '火焰映照出真相。',
        createdAt: '2025-07-20T18:30:00.000Z',
      };
      saveNote(note);
      const saved = getNotes()[0];
      expect(saved.id).toBe('note-full');
      expect(saved.symbolName).toBe('焰');
      expect(saved.element).toBe('fire');
      expect(saved.content).toBe('火焰映照出真相。');
      expect(saved.createdAt).toBe('2025-07-20T18:30:00.000Z');
    });
  });

  describe('deleteNote()', () => {
    it('removes specific note', () => {
      const note1 = createNote({ id: 'note-1' });
      const note2 = createNote({ id: 'note-2' });
      saveNote(note1);
      saveNote(note2);

      deleteNote('note-1');

      const notes = getNotes();
      expect(notes).toHaveLength(1);
      expect(notes[0].id).toBe('note-2');
    });

    it('does nothing if note id does not exist', () => {
      const note = createNote();
      saveNote(note);
      deleteNote('nonexistent');
      expect(getNotes()).toHaveLength(1);
    });

    it('handles deleting from empty storage', () => {
      expect(() => deleteNote('nonexistent')).not.toThrow();
      expect(getNotes()).toEqual([]);
    });
  });

  describe('clearNotes()', () => {
    it('removes all notes', () => {
      saveNote(createNote({ id: 'note-1' }));
      saveNote(createNote({ id: 'note-2' }));
      saveNote(createNote({ id: 'note-3' }));
      expect(getNotes()).toHaveLength(3);

      clearNotes();
      expect(getNotes()).toEqual([]);
    });

    it('handles clearing empty storage', () => {
      expect(() => clearNotes()).not.toThrow();
      expect(getNotes()).toEqual([]);
    });
  });
});
