import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://byypccigolqoggrkushe.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5eXBjY2lnb2xxb2dncmt1c2hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0NjQzNTAsImV4cCI6MjA2ODA0MDM1MH0.HXU-pxVecURvfZXaTgS_TC53iX8hAOs7MoFPYc_X6NI'

export const supabase = createClient(supabaseUrl, supabaseKey);