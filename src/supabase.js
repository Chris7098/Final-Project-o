import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://fotwqsvgzztxqnwanhrs.supabase.co'; 
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY; 


if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL or the Anon Key is missing in env!");
}


const supabase = createClient(supabaseUrl, supabaseAnonKey);


export default supabase;
