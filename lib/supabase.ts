import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: "queued" | "in_progress" | "done";
  created_at: string;
  updated_at: string;
};

export type ActivityLogEntry = {
  id: string;
  type: string;
  message: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

export type Project = {
  id: string;
  name: string;
  description: string | null;
  status: string;
  repo_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Session = {
  id: string;
  started_at: string;
  ended_at: string | null;
  summary: string | null;
};

export type Message = {
  id: string;
  direction: "inbound" | "outbound";
  content: string;
  created_at: string;
};
