"use client";

import { useEffect, useState } from "react";
import { supabasePublic } from "@/lib/supabase-public";
import { EmbedWidget } from "./EmbedWidget";

export function SiteWidget({
  slug,
  fallback,
  title,
}: {
  slug: string;
  fallback?: React.ReactNode;
  title?: string;
}) {
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    if (!supabasePublic) return;
    supabasePublic
      .from("site_widgets")
      .select("embed_code")
      .eq("slug", slug)
      .eq("active", true)
      .single()
      .then(({ data, error }) => {
        if (error) setCode(null);
        else setCode(data?.embed_code || null);
      });
  }, [slug]);

  return (
    <div className="my-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {title && <h3 className="mb-4 text-lg font-semibold">{title}</h3>}
      <EmbedWidget
        code={code}
        fallback={
          fallback ?? (
            <p className="text-sm text-gray-600">
              Widget <code>{slug}</code> será exibido quando o código de embed
              for cadastrado no painel /admin ou no Supabase.
            </p>
          )
        }
      />
    </div>
  );
}
