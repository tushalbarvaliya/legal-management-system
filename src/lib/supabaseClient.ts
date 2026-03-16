import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vbzlaeyfqfzrbjxfztrh.supabase.co";
const supabaseKey = "sb_publishable_PxgTslgrPhZLm3cixSKXiw_eJuMSOAy";

export const supabase = createClient(supabaseUrl, supabaseKey);
