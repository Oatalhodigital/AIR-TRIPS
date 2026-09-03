import { OfferCard } from "@/components/OfferCard";
import { TravelpayoutsWidget } from "@/components/TravelpayoutsWidget";
import { getOffers } from "@/lib/data";

export const revalidate = 300;

export const metadata = {
  title: "Voos Corporativos MG-RJ, SP-RIO, BA-SP — AIR-TRIP",
  description: "Compare rotas corporativas selecionadas para executivos: Belo Horizonte, São Paulo, Salvador e mais.",
};

export default async function VoosCorporativosPage() {
  const offers = await getOffers();
  const corporate = offers.filter(
    (o) => o.category === "flight_domestic_corporate"
  );
  const widget = corporate.find((o) => o.embed_code)?.embed_code;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-foreground">
        Voos Corporativos
      </h1>
      <p className="mb-8 max-w-2xl text-gray-600">
        Rotas estratégicas para executivos: BH ↔ RJ, SP ↔ RIO, BA ↔ SP e outras.
      </p>

      {widget && (
        <div className="mb-10">
          <TravelpayoutsWidget code={widget} />
        </div>
      )}

      {corporate.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-gray-500">
          Nenhuma oferta corporativa cadastrada ainda.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {corporate.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      )}
    </section>
  );
}
