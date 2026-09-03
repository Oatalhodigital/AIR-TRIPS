import { OfferCard } from "@/components/OfferCard";
import { TravelpayoutsWidget } from "@/components/TravelpayoutsWidget";
import { getOffers } from "@/lib/data";

export const revalidate = 300;

export const metadata = {
  title: "Voos Promocionais — AIR-TRIP",
  description: "Ofertas de passagens de lazer e tarifas promocionais.",
};

export default async function VoosComerciaisPage() {
  const offers = await getOffers();
  const leisure = offers.filter(
    (o) => o.category === "flight_domestic_leisure"
  );
  const widget = leisure.find((o) => o.embed_code)?.embed_code;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-foreground">
        Voos Promocionais
      </h1>
      <p className="mb-8 max-w-2xl text-gray-600">
        Passagens de lazer com preços atrativos para você aproveitar.
      </p>

      {widget && (
        <div className="mb-10">
          <TravelpayoutsWidget code={widget} />
        </div>
      )}

      {leisure.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-gray-500">
          Nenhuma oferta promocional cadastrada ainda.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leisure.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      )}
    </section>
  );
}
