'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { getUserNotes, saveNote, deleteNote } from '@/lib/notes';

export default function NotesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    } else if (user) {
      loadNotes();
    }
  }, [user, loading]);

  const loadNotes = async () => {
    try {
      const data = await getUserNotes(user!.id);
      setNotes(data);
    } catch (err) {
      console.error('Error loading notes:', err);
      setError('Failed to load notes.');
    }
  };

  const handleAddNote = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      const newNote = await saveNote({
        title,
        content,
        user_id: user!.id,
      });

      setNotes([newNote, ...notes]);
      setTitle('');
      setContent('');
      setError('');
    } catch (err) {
      console.error('Failed to save:', err);
      setError('Failed to save note.');
    }
  };

  const handleDelete = async (noteId: string) => {
    try {
      await deleteNote(noteId);
      setNotes(notes.filter((note) => note.id !== noteId));
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  if (loading || !user) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">📝 Smart Notes</h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
        <textarea
          placeholder="Note content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
        <button
          onClick={handleAddNote}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          Save Note
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">📂 Your Notes</h2>
        {notes.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No notes yet. Start writing something!</p>
        ) : (
          <ul className="space-y-3">
            {notes.map((note) => (
              <li
                key={note.id}
                className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow relative"
              >
                <h3 className="text-lg font-bold">{note.title}</h3>
                <p className="text-sm mt-1">{note.content}</p>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
