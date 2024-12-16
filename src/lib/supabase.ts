import { createClient } from '@supabase/supabase-js';

// Get the URL and anon key from your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables', {
    supabaseUrl: !!supabaseUrl,
    supabaseAnonKey: !!supabaseAnonKey
  });
  throw new Error('Missing Supabase environment variables. Make sure you are connected to Supabase in the Lovable interface.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);