"use server";

import { createClient } from "@/lib/supabase";
import { createAdminClient } from "@/lib/supabase-admin";

export async function signIn(_prevState: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Credenciais inválidas." };
  }

  return { ok: true };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}

export async function getSession() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user, error: error?.message };
}

export async function listRoutes() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("routes")
      .select("*")
      .order("display_name");
    return { data: data ?? [], error: error?.message };
  } catch (e) {
    return { data: [], error: String(e) };
  }
}

export async function listLinks() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("affiliate_links")
      .select("*, routes(display_name), affiliate_networks(name)")
      .order("created_at", { ascending: false });
    return { data: data ?? [], error: error?.message };
  } catch (e) {
    return { data: [], error: String(e) };
  }
}

export async function createRoute(_prevState: unknown, formData: FormData) {
  const row = {
    origin_city: String(formData.get("origin_city") ?? ""),
    origin_state: String(formData.get("origin_state") ?? ""),
    destination_city: String(formData.get("destination_city") ?? ""),
    destination_state: String(formData.get("destination_state") ?? ""),
    route_type: String(formData.get("route_type") ?? "corporate"),
    display_name: String(formData.get("display_name") ?? ""),
  };
  if (!row.display_name) return { error: "Nome de exibição é obrigatório." };

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("routes").insert([row]);
    if (error) return { error: error.message };
    return { ok: true };
  } catch (e) {
    return { error: String(e) };
  }
}

export async function createLink(_prevState: unknown, formData: FormData) {
  const category = String(formData.get("category") ?? "");
  const routeId = String(formData.get("route_id") ?? "");
  const row = {
    network_id: String(formData.get("network_id") ?? ""),
    category,
    route_id: category.startsWith("flight") && routeId ? routeId : null,
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    image_url: String(formData.get("image_url") ?? ""),
    price_hint: Number(formData.get("price_hint") || 0) || null,
    raw_url: String(formData.get("raw_url") ?? ""),
    tracking_url: String(formData.get("tracking_url") ?? ""),
    embed_code: String(formData.get("embed_code") ?? ""),
    active: true,
    featured: formData.get("featured") === "on",
  };
  if (!row.title || !row.tracking_url) {
    return { error: "Título e link de afiliado são obrigatórios." };
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("affiliate_links").insert([row]);
    if (error) return { error: error.message };
    return { ok: true };
  } catch (e) {
    return { error: String(e) };
  }
}

export async function toggleLink(
  id: string,
  field: "active" | "featured",
  value: boolean
) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("affiliate_links")
      .update({ [field]: value })
      .eq("id", id);
    return { error: error?.message };
  } catch (e) {
    return { error: String(e) };
  }
}
