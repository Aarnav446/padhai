import { supabase } from './supabase';

export async function saveFlashcard(flashcard: {
  topic: string;
  title: string;
  content: string;
  image_url: string;
  explanation?: string;
}) {
  const { data, error } = await supabase
    .from('flashcards')
    .insert(flashcard)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserFlashcards(userId: string) {
  const { data, error } = await supabase
    .from('flashcards')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function deleteFlashcard(id: string) {
  const { error } = await supabase
    .from('flashcards')
    .delete()
    .eq('id', id);

  if (error) throw error;
}