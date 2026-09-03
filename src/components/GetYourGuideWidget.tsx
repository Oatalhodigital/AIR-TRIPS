"use client";

import { EmbedWidget } from "./EmbedWidget";

export function GetYourGuideWidget({ code }: { code?: string | null }) {
  return (
    <EmbedWidget
      code={code}
      fallback={
        <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
          Buscando atividades e passeios...
        </p>
      }
    />
  );
}
