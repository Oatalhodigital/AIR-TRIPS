"use client";

import { useActionState } from "react";
import { submitLead } from "./actions";

export default function ContatoPage() {
  const [state, formAction] = useActionState(submitLead, null);

  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-foreground">Cotação Corporativa</h1>
      <p className="mb-8 text-gray-600">
        Preencha os dados abaixo e retornaremos com as melhores opções para sua empresa.
      </p>

      {state?.error && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {state.error}
        </p>
      )}
      {state?.ok && (
        <p className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
          {state.message}
        </p>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-foreground">
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="whatsapp" className="mb-1 block text-sm font-medium text-foreground">
            WhatsApp
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="company" className="mb-1 block text-sm font-medium text-foreground">
            Empresa
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-foreground">
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex items-start gap-3">
          <input
            id="lgpd_consent"
            name="lgpd_consent"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="lgpd_consent" className="text-sm text-gray-600">
            Concordo com a coleta dos meus dados para resposta desta solicitação,
            conforme a Política de Privacidade.
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white transition hover:bg-primary-hover"
        >
          Enviar
        </button>
      </form>
    </section>
  );
}
