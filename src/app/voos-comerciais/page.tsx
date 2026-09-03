import { OfferCard } from "@/components/OfferCard";
import { getOffers } from "@/lib/data";

export const metadata = {
  title: "Voos Promocionais — AIR-TRIP",
  description: "Ofertas de passagens de lazer e tarifas promocionais.",
};

export default async function VoosComerciaisPage() {
  const offers = await getOffers();
  const leisure = offers.filter(
    (o) => o.category === "flight_domestic_leisure"
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-foreground">
        Voos Promocionais
      </h1>
      <p className="mb-8 max-w-2xl text-gray-600">
        Passagens de lazer com preços atrativos para você aproveitar.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {leisure.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  );
}
