"use server";

import { supabase } from "@/lib/supabase";

export async function submitLead(_prevState: unknown, formData: FormData) {
  const data = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    whatsapp: String(formData.get("whatsapp") ?? ""),
    company: String(formData.get("company") ?? ""),
    message: String(formData.get("message") ?? ""),
    lgpd_consent: formData.get("lgpd_consent") === "on",
  };

  if (!data.lgpd_consent) {
    return { error: "Você precisa concordar com a coleta de dados." };
  }

  if (!supabase) {
    console.log("Supabase não configurado. Lead simulado:", data);
    return { ok: true, message: "Mensagem registrada (modo simulação — configure o Supabase para persistir)." };
  }

  const { error } = await supabase.from("leads").insert([data]);

  if (error) {
    console.error(error);
    return { error: "Erro ao enviar. Tente novamente." };
  }

  return { ok: true, message: "Solicitação enviada com sucesso!" };
}
