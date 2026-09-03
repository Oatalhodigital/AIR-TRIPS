"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "../actions";

export default function AdminLoginPage() {
  const [state, formAction] = useActionState(signIn, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.ok) router.push("/admin");
  }, [state, router]);

  return (
    <section className="mx-auto max-w-md px-4 py-20">
      <h1 className="mb-6 text-2xl font-bold text-foreground">
        Login do Admin
      </h1>
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">E-mail</label>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Senha</label>
          <input
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
          />
        </div>
        {state?.error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {state.error}
          </p>
        )}
        <button className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary-hover">
          Entrar
        </button>
      </form>
    </section>
  );
}
