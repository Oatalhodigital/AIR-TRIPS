"use client";

import { useState } from "react";

export default function AdminPage() {
  const [tab, setTab] = useState<"link" | "route" | "post">("link");

  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-foreground">Painel Admin</h1>
      <p className="mb-6 text-gray-600">
        Painel básico para cadastro manual de ofertas. Em produção, esta rota deve
        ser protegida por autenticação.
      </p>

      <div className="mb-6 flex gap-2">
        {[
          { key: "link", label: "Oferta" },
          { key: "route", label: "Rota" },
          { key: "post", label: "Conteúdo" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as typeof tab)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              tab === t.key
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "link" && (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-foreground">Título</label>
            <input className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">Categoria</label>
            <select className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm">
              <option>flight_domestic_corporate</option>
              <option>flight_domestic_leisure</option>
              <option>hotel</option>
              <option>activity</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">URL de afiliado (tracking_url)</label>
            <input className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">Preço a partir de</label>
            <input type="number" className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm" />
          </div>
          <button className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary-hover">
            Salvar (simulação)
          </button>
        </form>
      )}

      {tab === "route" && (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground">Origem</label>
              <input className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">UF</label>
              <input className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground">Destino</label>
              <input className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">UF</label>
              <input className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm" />
            </div>
          </div>
          <button className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary-hover">
            Salvar (simulação)
          </button>
        </form>
      )}

      {tab === "post" && (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-foreground">Título</label>
            <input className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">Corpo / Roteiro</label>
            <textarea rows={5} className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm" />
          </div>
          <button className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary-hover">
            Salvar (simulação)
          </button>
        </form>
      )}
    </section>
  );
}
