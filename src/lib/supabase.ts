import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://esguaeuyxhdgxwycpwnx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzZ3VhZXV5eGhkZ3h3eWNwd254Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzMjM3NzIsImV4cCI6MjA0OTg5OTc3Mn0.hSDdm-qj5aTFsxsYsKp-A_FykrwhPUBs5TDnMHrDoKM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);