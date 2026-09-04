import { OfferCard } from "@/components/OfferCard";
import { TravelpayoutsWidget } from "@/components/TravelpayoutsWidget";
import { SiteWidget } from "@/components/SiteWidget";
import { getOffers } from "@/lib/data";

export const revalidate = 300;

export const metadata = {
  title: "Hotéis — AIR-TRIP",
  description: "Hospedagens selecionadas em destinos nacionais.",
};

export default async function HoteisPage() {
  const offers = await getOffers();
  const hotels = offers.filter((o) => o.category === "hotel");
  const widget = hotels.find((o) => o.embed_code)?.embed_code;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-foreground">Hotéis</h1>
      <p className="mb-8 max-w-2xl text-gray-600">
        Opções de hospedagem próximas a aeroportos e pontos turísticos.
      </p>

      <SiteWidget
        slug="hotellook-search"
        title="Buscar hotéis"
        fallback={
          <p className="text-sm text-gray-600">
            O formulário de busca de hotéis aparecerá aqui quando o código
            Hotellook for cadastrado no painel /admin.
          </p>
        }
      />

      {widget && (
        <div className="mb-10">
          <TravelpayoutsWidget code={widget} />
        </div>
      )}

      {hotels.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-gray-500">
          Nenhuma oferta de hotel cadastrada ainda.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      )}
    </section>
  );
}
