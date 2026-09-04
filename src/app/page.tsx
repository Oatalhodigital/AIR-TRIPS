import { OfferCard } from "@/components/OfferCard";
import { EmbedWidget } from "@/components/EmbedWidget";
import { getOffers } from "@/lib/data";

export const revalidate = 300;

// Widget A — promo_id 4563 (destaques gerais internacionais)
const widgetA = `<script async src="https://tpwdg.com/content?currency=brl&trs=570051&shmarker=772285&locale=pt&powered_by=true&limit=4&primary_color=1A73E8ff&results_background_color=FFFFFF&form_background_color=FFFFFF&promo_id=4563&campaign_id=111" charset="utf-8"></script>`;

// Widget C — destino internacional específico (city=60691)
// O rótulo do destino será ajustado quando o usuário confirmar qual cidade é city=60691.
const widgetC = `<script async src="//tpwdg.com/content?trs=570051&shmarker=772285&locale=pt&country=35&city=60691&powered_by=true&campaign_id=87&promo_id=2466" charset="utf-8"></script>`;

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

      <section
        id="internacional"
        className="scroll-mt-24 border-t border-blue-100 bg-blue-50/40 px-4 py-16"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-3 text-3xl font-bold text-foreground">
            Viagens Internacionais
          </h2>
          <p className="mb-10 max-w-2xl text-gray-600">
            Planejando uma viagem para fora do Brasil? Aqui estão as melhores
            ofertas para quem vai viajar internacionalmente — voos, destinos e
            serviços selecionados para o viajante que cruza fronteiras.
          </p>

          <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">
              Destinos internacionais em destaque
            </h3>
            <EmbedWidget
              code={widgetA}
              fallback={
                <p className="text-sm text-gray-600">
                  Os destaques de viagens internacionais aparecerão aqui em
                  breve.
                </p>
              }
            />
          </div>

          <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">
              Destino internacional em destaque
            </h3>
            <p className="mb-3 text-sm text-gray-500">
              Oferta específica para um destino selecionado — o rótulo será
              refinado em breve.
            </p>
            <EmbedWidget
              code={widgetC}
              fallback={
                <p className="text-sm text-gray-600">
                  O destino em destaque aparecerá aqui em breve.
                </p>
              }
            />
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 text-sm text-blue-900">
            <p>
              <strong>Dica:</strong> para voos domésticos no Brasil, use as
              páginas{" "}
              <a
                href="/voos-corporativos"
                className="font-medium underline hover:text-primary"
              >
                Corporativo
              </a>{" "}
              e{" "}
              <a
                href="/voos-comerciais"
                className="font-medium underline hover:text-primary"
              >
                Promoções
              </a>
              . Esta seção é exclusiva para viagens internacionais.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
