import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://imjhlftqemwvnveytjdj.supabase.co';
const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_IhxybuBja13OaQa8sAQLPA_2mgLrAmO';

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
