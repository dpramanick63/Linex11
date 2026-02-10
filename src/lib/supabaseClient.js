import { createClient } from '@supabase/supabase-js'

// We are using these fake URLs just to let the app load for now.
// The Login/Register won't work, but the design will appear!
const supabaseUrl = 'https://ejklexnvjxklsutqwjwv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqa2xleG52anhrbHN1dHF3and2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MjgwNTksImV4cCI6MjA4NjIwNDA1OX0.TZPVoPilnWRT96Z86pqVMsPz7t_iUdM5i7a67Wrtuew'

export const supabase = createClient(supabaseUrl, supabaseKey)