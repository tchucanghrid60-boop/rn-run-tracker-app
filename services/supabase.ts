import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://widggkbdtpzvpjagfpqq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpZGdna2JkdHB6dnBqYWdmcHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxODczODksImV4cCI6MjA4NTc2MzM4OX0.cSGPPLOLRw5V4Zwzg8qhpN0gwp4HKrNF8rkZ42w1zb0";

export const supabase = createClient(supabaseUrl, supabaseKey);
