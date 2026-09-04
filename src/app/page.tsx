import { OfferCard } from "@/components/OfferCard";
import { getOffers } from "@/lib/data";

export const revalidate = 300;

export default async function Home() {
  const offers = await getOffers();
  const featured = offers.filter((o) => o.featured);

  return (
    <>
      <section className="bg-gradient-to-br from-primary to-primary-hover px-4 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Passagens corporativas e ofertas de viagem
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            O AIR-TRIP compara as melhores opções de voos, hotéis e passeios para você comprar direto no parceiro.
          </p>
          <a
            href="/contato"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-base font-semibold text-primary transition hover:bg-gray-100"
          >
            Solicitar cotação corporativa
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-8 text-2xl font-bold text-foreground">Destaques</h2>
        {featured.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-gray-500">
            Nenhuma oferta em destaque. Cadastre uma no painel /admin.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-8 text-2xl font-bold text-foreground">Categorias</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/voos-corporativos", title: "Voos Corporativos", desc: "Rotas para executivos e empresas." },
            { href: "/voos-comerciais", title: "Voos Promocionais", desc: "Passagens de lazer com preço." },
            { href: "/hoteis", title: "Hotéis", desc: "Hospedagens em destinos nacionais." },
            { href: "/passeios", title: "Passeios", desc: "Atividades e tours selecionados." },
          ].map((c) => (
            <a
              key={c.href}
              href={c.href}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-primary">{c.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{c.desc}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
