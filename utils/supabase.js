import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase project URL and anon/public key
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_KEY = 'your-anon-or-service-role-key';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const admin = {
  async getPendingSubmissions() {
    const { data, error } = await supabase
      .from('tool_submissions')
      .select('*')
      .eq('status', 'pending');
    if (error) {
      console.error('Error fetching pending submissions:', error);
      return { data: [], error };
    }
    return { data };
  },
};
