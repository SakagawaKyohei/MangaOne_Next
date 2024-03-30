import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/utils/database.types';

 export type TypeSupabaseClient=SupabaseClient<Database> ;
let client:TypeSupabaseClient | undefined; 
 
export function getSupabaseBrowserClient() {
  if (client) {
    return client;
  }
 
 
  client = createBrowserClient<Database>(
    "https://zrhhzqtaizoqtwmnzzbi.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyaGh6cXRhaXpvcXR3bW56emJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIxOTM3OTksImV4cCI6MjAxNzc2OTc5OX0.IPlitQ287AHickTXdmVMy18y2hqvsOY2EAVM3NCGq0w",
  );
 
  return client;
}