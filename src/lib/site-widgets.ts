import { supabasePublic } from "./supabase-public";

export interface SiteWidget {
  id: string;
  slug: string;
  name: string;
  page: string;
  embed_code: string | null;
  active: boolean;
}

export async function getSiteWidget(slug: string): Promise<SiteWidget | null> {
  if (!supabasePublic) return null;
  const { data, error } = await supabasePublic
    .from("site_widgets")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();
  if (error || !data) return null;
  return data as unknown as SiteWidget;
}
