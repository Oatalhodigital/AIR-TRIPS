"use client";

import { useEffect, useState } from "react";
import { supabasePublic } from "@/lib/supabase-public";
import { EmbedWidget } from "./EmbedWidget";

export function FlightSearchWidget() {
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    if (!supabasePublic) return;
    supabasePublic
      .from("partners")
      .select("embed_code")
      .eq("slug", "aviasales")
      .single()
      .then(({ data, error }) => {
        if (error) setCode(null);
        else setCode(data?.embed_code || null);
      });
  }, []);

  return (
    <div className="my-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Buscar passagens</h3>
      <EmbedWidget
        code={code}
        fallback={
          <p className="text-sm text-gray-600">
            O formulário de busca de voos será exibido quando o widget Aviasales for configurado no painel /admin.
          </p>
        }
      />
    </div>
  );
}
