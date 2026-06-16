import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase SERVER-ONLY.
 * - Retorna null se as envs não estiverem configuradas → a app continua usando
 *   os stubs (`lib/obras.ts`, form de contato), SEM tocar o Supabase.
 * - NUNCA usar prefixo NEXT_PUBLIC na service-role key (não pode ir ao cliente).
 * - Guard-rail (B5): a escrita de leads só roda com LEADS_WRITE_ENABLED=true.
 */
export function getSupabaseServer(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

/** Flag do guard-rail de leads (B5): escrita só quando explicitamente ligada. */
export const LEADS_WRITE_ENABLED = process.env.LEADS_WRITE_ENABLED === "true";
