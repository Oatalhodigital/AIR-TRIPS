import { EmbedWidget } from "@/components/EmbedWidget";

export const revalidate = 300;

export const metadata = {
  title: "Viagens Internacionais — AIR-TRIP",
  description:
    "Ofertas e destinos para quem vai viajar para fora do Brasil. Voos, passeios e serviços para viagens internacionais.",
};

// Widget A — promo_id 4563 (destaques gerais internacionais)
const widgetA = `<script async src="https://tpwdg.com/content?currency=brl&trs=570051&shmarker=772285&locale=pt&powered_by=true&limit=4&primary_color=1A73E8ff&results_background_color=FFFFFF&form_background_color=FFFFFF&promo_id=4563&campaign_id=111" charset="utf-8"></script>`;

// Widget C — destino internacional específico (city=60691)
// O rótulo do destino será ajustado quando o usuário confirmar qual cidade é city=60691.
const widgetC = `<script async src="//tpwdg.com/content?trs=570051&shmarker=772285&locale=pt&country=35&city=60691&powered_by=true&campaign_id=87&promo_id=2466" charset="utf-8"></script>`;

export default function InternacionalPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-foreground">
        Viagens Internacionais
      </h1>
      <p className="mb-10 max-w-2xl text-gray-600">
        Planejando uma viagem para fora do Brasil? Aqui estão as melhores
        ofertas para quem vai viajar internacionalmente — voos, destinos e
        serviços selecionados para o viajante que cruza fronteiras.
      </p>

      <div className="my-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Destinos internacionais em destaque
        </h2>
        <EmbedWidget
          code={widgetA}
          fallback={
            <p className="text-sm text-gray-600">
              Os destaques de viagens internacionais aparecerão aqui em breve.
            </p>
          }
        />
      </div>

      <div className="my-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Destino internacional em destaque
        </h2>
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

      <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6 text-sm text-blue-900">
        <p>
          <strong>Dica:</strong> para voos domésticos no Brasil, use as páginas{" "}
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
    </section>
  );
}
