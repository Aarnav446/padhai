import { supabase } from './supabase';

export async function getUserNotes(userId: string) {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function saveNote(note: {
  title: string;
  content: string;
  user_id: string;
}) {
  const { data, error } = await supabase.from('notes').insert([note]).select().single();

  if (error) throw error;
  return data;
}

export async function deleteNote(id: string) {
  const { error } = await supabase.from('notes').delete().eq('id', id);
  if (error) throw error;
}
