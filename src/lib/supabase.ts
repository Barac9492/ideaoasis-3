import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Idea {
  id: string;
  title: string;
  description: string;
  source_url: string;
  source_country: string;
  original_idea: string;
  korean_adaptation: string;
  feasibility_score: number;
  confidence_score: number;
  category: string;
  tags: string[];
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  reviewed_by?: string;
  reviewed_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'free' | 'pro' | 'enterprise';
  created_at: Date;
  updated_at: Date;
}

export interface UserInteraction {
  id: string;
  user_id: string;
  idea_id: string;
  interaction_type: 'view' | 'save' | 'share' | 'discuss' | 'rate';
  metadata?: any;
  created_at: Date;
} 