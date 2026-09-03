import { OfferCard } from "@/components/OfferCard";
import { getOffers } from "@/lib/data";

export const metadata = {
  title: "Voos Corporativos — AIR-TRIP",
  description: "Rotas domésticas corporativas selecionadas para empresas.",
};

export default async function VoosCorporativosPage() {
  const offers = await getOffers();
  const corporate = offers.filter(
    (o) => o.category === "flight_domestic_corporate"
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-foreground">
        Voos Corporativos
      </h1>
      <p className="mb-8 max-w-2xl text-gray-600">
        Rotas estratégicas para executivos: BH ↔ RJ, SP ↔ RIO, BA ↔ SP e outras.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {corporate.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  );
}
