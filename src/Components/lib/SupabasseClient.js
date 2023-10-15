import { createClient } from '@supabase/supabase-js';
  

export const supabase = createClient(
    "https://dnnzckqhjnbdxvgwktfg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRubnpja3Foam5iZHh2Z3drdGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4ODA0MzAsImV4cCI6MjAxMjQ1NjQzMH0.P5uzn14rJCtj2_LrE3TS7bNMG0ptDIUyUr1jurXnza0"
);