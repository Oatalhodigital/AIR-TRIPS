"use server";

import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

const ADMIN_COOKIE = "admin-auth";

export async function checkAuth() {
  const c = await cookies();
  return c.get(ADMIN_COOKIE)?.value === "1";
}

export async function login(_prevState: unknown, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (password !== process.env.ADMIN_PASSWORD) {
    return { ok: false, error: "Senha incorreta." };
  }
  const c = await cookies();
  c.set(ADMIN_COOKIE, "1", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return { ok: true };
}

export async function logout() {
  const c = await cookies();
  c.delete(ADMIN_COOKIE);
  return { ok: true };
}

export async function listRoutes() {
  if (!supabase) return { data: [], error: "Supabase não configurado." };
  const { data, error } = await supabase
    .from("routes")
    .select("*")
    .order("display_name");
  return { data: data ?? [], error: error?.message };
}

export async function listLinks() {
  if (!supabase) return { data: [], error: "Supabase não configurado." };
  const { data, error } = await supabase
    .from("affiliate_links")
    .select("*, routes(display_name), affiliate_networks(name)")
    .order("created_at", { ascending: false });
  return { data: data ?? [], error: error?.message };
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
  if (!supabase) return { error: "Supabase não configurado." };
  const { error } = await supabase.from("routes").insert([row]);
  if (error) return { error: error.message };
  return { ok: true };
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
  if (!supabase) return { error: "Supabase não configurado." };
  const { error } = await supabase.from("affiliate_links").insert([row]);
  if (error) return { error: error.message };
  return { ok: true };
}

export async function toggleLink(
  id: string,
  field: "active" | "featured",
  value: boolean
) {
  if (!supabase) return { error: "Supabase não configurado." };
  const { error } = await supabase
    .from("affiliate_links")
    .update({ [field]: value })
    .eq("id", id);
  return { error: error?.message };
}
