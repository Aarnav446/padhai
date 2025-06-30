
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


// Database types
export interface Database {
  public: {
    Tables: {
      flashcards: {
        Row: {
          id: string;
          user_id: string;
          topic: string;
          title: string;
          content: string;
          image_url: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          topic: string;
          title: string;
          content: string;
          image_url: string;
        };
      };
      quiz_results: {
        Row: {
          id: string;
          user_id: string;
          topic: string;
          score: number;
          total_questions: number;
          completed_at: string;
        };
      };
    };
  };
}