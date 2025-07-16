// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = vzdufzptwcuytmjhpfwr.supabase.co;
const supabaseKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6ZHVmenB0d2N1eXRtamhwZndyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMjUyNjIsImV4cCI6MjA2NTgwMTI2Mn0.DAwkFXtptkWVRqlYQi6Y1uiagqqW35MaPNP19rVhvOk;
export const supabase = createClient(supabaseUrl, supabaseKey);


/*
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
*/
